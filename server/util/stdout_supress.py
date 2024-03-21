import os
import sys

def suppress_stdout(enable=True):
    """
    Temporarily suppresses the standard output stream, preventing printed messages from being displayed.

    Parameters:
    - enable (bool, optional): If True, suppresses standard output. If False, restores standard output.
                               Defaults to True.

    Notes:
    - When 'enable' is set to True, this function redirects the standard output stream to the null device,
      effectively discarding any printed messages.
    - When 'enable' is set to False, standard output is restored to its original state.
    """
    if enable:
        sys.stdout = open(os.devnull, 'w')
    else:
        sys.stdout = sys.__stdout__