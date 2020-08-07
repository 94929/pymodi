"""Module module."""

import time
from typing import Union

from enum import IntEnum

from modi.util.msgutil import parse_message

BROADCAST_ID = 0xFFF


class Module:
    """
    :param int id_: The id of the module.
    :param int uuid: The uuid of the module.
    """

    class Property:
        def __init__(self, value: Union[int, float] = 0):
            self.value = value
            self.last_update_time = time.time()

    class State(IntEnum):
        RUN = 0
        WARNING = 1
        FORCED_PAUSE = 2
        ERROR_STOP = 3
        UPDATE_FIRMWARE = 4
        UPDATE_FIRMWARE_READY = 5
        REBOOT = 6
        PNP_ON = 1
        PNP_OFF = 2

    def __init__(self, id_, uuid, conn_task):
        self._id = id_
        self._uuid = uuid
        self._conn = conn_task

        self.module_type = str()
        self._properties = dict()

        self.is_connected = True
        self.last_updated = time.time()
        self.battery = 100
        self.position = (0, 0)
        self.__version = None
        self.has_user_code = False

    def __gt__(self, other):
        if self.order == other.order:
            if self.position[0] == other.position[0]:
                return self.position[1] < other.position[1]
            else:
                return self.position[0] > other.position[0]
        else:
            return self.order > other.order

    def __lt__(self, other):
        if self.order == other.order:
            if self.position[0] == other.position[0]:
                return self.position[1] < other.position[1]
            else:
                return self.position[0] < other.position[0]
        else:
            return self.order < other.order

    @property
    def version(self):
        version_string = ""
        version_string += str(self.__version >> 13) + '.'
        version_string += str(self.__version % (2 ** 13) >> 8) + '.'
        version_string += str(self.__version % (2 ** 8))
        return version_string

    @version.setter
    def version(self, version_info):
        self.__version = version_info

    @property
    def order(self):
        return self.position[0] ** 2 + self.position[1] ** 2

    @property
    def id(self) -> int:
        return self._id

    @property
    def uuid(self) -> int:
        return self._uuid

    @property
    def is_up_to_date(self):
        import urllib.request as ur
        from urllib.error import URLError

        version_path = (
            "https://download.luxrobo.com/modi-skeleton-mobile/version.txt"
        )
        version_info = None
        try:
            for line in ur.urlopen(version_path, timeout=1):
                version_info = line.decode('utf-8').lstrip('v')
            version_digits = [int(digit) for digit in version_info.split('.')]
            """ Version number is formed by concatenating all three version bits
                e.g. v2.2.4 -> 010 00010 00000100 -> 0100 0010 0000 0100
            """
            latest_version = (
                version_digits[0] << 13
                | version_digits[1] << 8
                | version_digits[2]
            )
        except URLError:
            print("Cannot validate module version, please checkout internet")
            return None
        return latest_version <= self.__version

    def _get_property(self, property_type: IntEnum) -> float:
        """ Get module property value and request

        :param property_type: Type of the requested property
        :type property_type: IntEnum
        """

        # Register property if not exists
        if property_type not in self._properties:
            self._properties[property_type] = self.Property()
            self.__request_property(self._id, property_type)

        # Request property value if not updated for 1.5 sec
        last_update = self._properties[property_type].last_update_time
        if time.time() - last_update > 1.5:
            self.__request_property(self._id, property_type)

        return self._properties[property_type].value

    def update_property(self, property_type: IntEnum,
                        property_value: float) -> None:
        """ Update property value and time

        :param property_type: Type of the updated property
        :type property_type: IntEnum
        :param property_value: Value to update the property
        :type property_value: float
        """
        if property_type not in self._properties:
            self._properties[property_type] = self.Property()
        self._properties[property_type].value = property_value
        self._properties[property_type].last_update_time = time.time()

    def __request_property(self, destination_id: int,
                           property_type: IntEnum) -> None:
        """ Generate message for request property

        :param destination_id: Id of the destination module
        :type destination_id: int
        :param property_type: Type of the requested property
        :type property_type: int
        :return: None
        """
        self._properties[property_type].last_update_time = time.time()
        self._conn.send(parse_message(0x03, 0, destination_id,
                                      (property_type, None, 95, None)))
