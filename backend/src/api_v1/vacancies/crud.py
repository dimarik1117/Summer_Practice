from sqlalchemy.ext.asyncio import AsyncSession

from typing import Type

from core.models import Area


async def get_one(session: AsyncSession, model: Type, key)-> Type | None:
    return await session.get(model, key)

async def create(session: AsyncSession, model: Type, scheme_in: Type ) -> Area: 
    in_model = model(**scheme_in.model_dump())
    session.add(in_model)
    await session.commit()
    return in_model