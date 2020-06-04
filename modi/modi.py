"""Main MODI module."""

import time
from typing import Tuple

import threading as th
import multiprocessing as mp
import os
import traceback

from modi.util.topology_manager import TopologyManager
from modi.util.that import check_complete

from modi._conn_proc import ConnProc
from modi._exe_thrd import ExeThrd
from modi.module.module import Module

from modi.util.firmware_updater import FirmwareUpdater


class MODI:
    """
    Example:
    >>> import modi
    >>> bundle = modi.MODI()
    """

    def __init__(self, nb_modules: int, conn_mode: str = "serial",
                 module_uuid: str = "", test: bool = False,
                 verbose: bool = False):
        self._modules = list()
        self._module_ids = dict()
        self._topology_data = dict()

        self._recv_q = mp.Queue()
        self._send_q = mp.Queue()

        self._com_proc = None
        self._exe_thrd = None

        self.firmware_updater = FirmwareUpdater(self._send_q, self._module_ids, nb_modules)

        # Init flag used to notify initialization of MODI modules
        module_init_flag = th.Event()

        # If in test run, do not create process and thread
        if test:
            return

        self._com_proc = ConnProc(
            self._recv_q, self._send_q, conn_mode, module_uuid, verbose
        )
        self._com_proc.daemon = True
        try:
            self._com_proc.start()
        except RuntimeError:
            if os.name == 'nt':
                print('\nProcess initialization failed!\nMake sure you are '
                      'using\n    if __name__ == \'__main__\' \n '
                      'in the main module.')
            else:
                traceback.print_exc()
            exit(1)

        child_watch = \
            th.Thread(target=self.watch_child_process)
        child_watch.daemon = True
        child_watch.start()

        time.sleep(1)
        self._exe_thrd = ExeThrd(
            self._modules,
            self._module_ids,
            self._topology_data,
            self._recv_q,
            self._send_q,
            module_init_flag,
            nb_modules,
            self.firmware_updater,
        )
        self._exe_thrd.daemon = True
        self._exe_thrd.start()
        time.sleep(1)

        self._topology_manager = TopologyManager(self._topology_data)
        module_init_timeout = 10 if conn_mode.startswith("ser") else 25
        module_init_flag.wait(timeout=module_init_timeout)
        if not module_init_flag.is_set():
            raise Exception("Modules are not initialized properly!")
            exit(1)
        print("MODI modules are initialized!")
        check_complete(self)

    def update_module_firmware(self):
        """Updates firmware of connected modules"""
        print("Request to update firmware of connected MODI modules.")
        self.firmware_updater.reset_state()
        self.firmware_updater.request_to_update_firmware()
        #self.firmware_updater.update_event.wait()
        print("Module firmwares have been updated!")
    def watch_child_process(self) -> None:
        while True:
            if not self._com_proc.is_alive():
                os._exit(1)
            time.sleep(0.05)

    def print_topology_map(self, print_id: bool = False) -> None:
        """Prints out the topology map

        :param print_id: if True, the result includes module id
        :return: None
        """
        self._topology_manager.print_topology_map(print_id)

    @property
    def modules(self) -> Tuple[Module]:
        """Tuple of connected modules except network module.
        Example:
        >>> bundle = modi.MODI()
        >>> modules = bundle.modules
        """
        return tuple(self._modules)

    @property
    def buttons(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.button.Button` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "button"])

    @property
    def dials(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.dial.Dial` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "dial"])

    @property
    def displays(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.display.Display` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "display"])

    @property
    def envs(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.env.Env` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "env"])

    @property
    def gyros(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.gyro.Gyro` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "gyro"])

    @property
    def irs(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.ir.Ir` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "ir"])

    @property
    def leds(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.led.Led` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "led"])

    @property
    def mics(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.mic.Mic` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "mic"])

    @property
    def motors(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.motor.Motor` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "motor"])

    @property
    def speakers(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.speaker.Speaker` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "speaker"])

    @property
    def ultrasonics(self) -> Tuple[Module]:
        """Tuple of connected :class:`~modi.module.ultrasonic.Ultrasonic` modules.
        """

        return tuple([module for module in self.modules
                      if module.type == "ultrasonic"])
