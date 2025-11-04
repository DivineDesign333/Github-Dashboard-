"""
Unit tests for signal_logger module.

These tests verify the structure and basic functionality without requiring
actual Google Sheets credentials.
"""

import unittest
from unittest.mock import Mock, patch, MagicMock
import pandas as pd


class TestLogSignals(unittest.TestCase):
    """Test cases for the log_signals function."""
    
    @patch('signal_logger.pygsheets.authorize')
    def test_log_signals_basic(self, mock_authorize):
        """Test that log_signals calls the correct methods."""
        # Import after patching
        from signal_logger import log_signals
        
        # Setup mock objects
        mock_gc = Mock()
        mock_sheet = Mock()
        mock_worksheet = Mock()
        
        mock_authorize.return_value = mock_gc
        mock_gc.open.return_value = mock_sheet
        mock_sheet.sheet1 = mock_worksheet
        
        # Create test data
        df = pd.DataFrame({
            'Close': [100.5, 101.2, 99.8]
        })
        
        # Call the function
        log_signals(df, 'TEST')
        
        # Verify authorize was called with correct parameter
        mock_authorize.assert_called_once_with(service_file='credentials.json')
        
        # Verify sheet was opened
        mock_gc.open.assert_called_once_with('Signal Log')
        
        # Verify append_table was called 3 times (once per row)
        assert mock_worksheet.append_table.call_count == 3
        
    @patch('signal_logger.pygsheets.authorize')
    def test_log_signals_data_format(self, mock_authorize):
        """Test that data is formatted correctly when appended."""
        from signal_logger import log_signals
        
        # Setup mocks
        mock_gc = Mock()
        mock_sheet = Mock()
        mock_worksheet = Mock()
        
        mock_authorize.return_value = mock_gc
        mock_gc.open.return_value = mock_sheet
        mock_sheet.sheet1 = mock_worksheet
        
        # Create test data
        df = pd.DataFrame({
            'Close': [150.25]
        })
        
        # Call the function
        log_signals(df, 'AAPL')
        
        # Check the format of appended data
        call_args = mock_worksheet.append_table.call_args_list[0]
        appended_data = call_args[0][0]
        
        # Verify data structure: [index, ticker, close, signal_type]
        assert len(appended_data) == 4
        assert appended_data[0] == '0'  # Index as string
        assert appended_data[1] == 'AAPL'  # Ticker
        assert appended_data[2] == 150.25  # Close price
        assert appended_data[3] == 'Bounce'  # Signal type
        
    @patch('signal_logger.pygsheets.authorize')
    def test_log_signals_multiple_rows(self, mock_authorize):
        """Test logging multiple signal rows."""
        from signal_logger import log_signals
        
        # Setup mocks
        mock_gc = Mock()
        mock_sheet = Mock()
        mock_worksheet = Mock()
        
        mock_authorize.return_value = mock_gc
        mock_gc.open.return_value = mock_sheet
        mock_sheet.sheet1 = mock_worksheet
        
        # Create test data with multiple rows
        df = pd.DataFrame({
            'Close': [100.0, 101.0, 102.0, 103.0]
        })
        
        # Call the function
        log_signals(df, 'MSFT')
        
        # Verify append_table was called for each row
        assert mock_worksheet.append_table.call_count == 4
        
        # Verify ticker is consistent across all calls
        for call in mock_worksheet.append_table.call_args_list:
            assert call[0][0][1] == 'MSFT'


if __name__ == '__main__':
    unittest.main()
