from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import Type

from core.models import Area


async def get_one(session: AsyncSession, model: Type, key)-> Type | None:
    return await session.get(model, key)

async def get_one_full(session: AsyncSession, model: Type, key) -> Type | None:
    result = await session.execute(
        select(model)
        .options(
            selectinload(model.area),
            selectinload(model.type_),
            selectinload(model.employer),
            selectinload(model.schedule),
            selectinload(model.employment),
            selectinload(model.experience),
            selectinload(model.salary),
            selectinload(model.snippet)
        )
        .filter_by(id=key)
    )
    return result.scalars().first()


async def create(session: AsyncSession, model: Type, scheme_in: Type ) -> Area: 
    in_model = model(**scheme_in.model_dump())
    session.add(in_model)
    await session.commit()
    return in_model