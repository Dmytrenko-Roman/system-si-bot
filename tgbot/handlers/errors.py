from typing import Optional

from aiogram.utils.exceptions import (TelegramAPIError,
                                      MessageNotModified,
                                      CantParseEntities)

from loader import dp



@dp.errors_handler()
async def errors_handler(update, exception) -> Optional[bool]:
    if isinstance(exception, MessageNotModified):
        # do something here?
        return True

    if isinstance(exception, CantParseEntities):
        # or here
        return True

    #  MUST BE THE  LAST CONDITION
    if isinstance(exception, TelegramAPIError):
        return True
