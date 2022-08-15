from email import message
from aiogram.types import Message
from aiogram.dispatcher.filters import Command
from aiogram.dispatcher import FSMContext

from loader import dp
from tgbot.states.states import SI


@dp.message_handler(Command("systemsi"))
async def start_converting(message: Message) -> Message:
    await SI.first()
    return await message.answer('Enter a value:')


@dp.message_handler(lambda message: message.text.isdigit(), state=SI.Value)
async def answer_value_correct(message: Message, state: FSMContext) -> Message:
    value = message.text
    await state.update_data(value=value)
    await SI.next()
    return await message.answer('Enter a unit:')


@dp.message_handler(lambda message: not message.text.isdigit(), state=SI.Value)
async def answer_value_incorrect(message: Message) -> Message:
    return await message.answer('Result: Enter a number!')


@dp.message_handler(state=SI.Unit)
async def answer_value(message: Message, state: FSMContext) -> Message:
    unit = message.text
    await state.finish()
    data = await state.get_data()
    return await message.answer('Result: ')
