import os
from dataclasses import dataclass


@dataclass
class TgBot:
    token: str
    admins: list


@dataclass
class Config:
    tg_bot: TgBot


def load_config(path: str = None) -> Config:
    # load_dotenv(path)
    return Config(
        tg_bot=TgBot(
            token=os.getenv('BOT_TOKEN', 'token'),
            admins=[
                '353057906',
            ],
        ),
    )
