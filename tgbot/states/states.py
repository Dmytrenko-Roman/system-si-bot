from aiogram.dispatcher.filters.state import StatesGroup, State


class SI(StatesGroup):
    Value = State()
    Unit = State()
