from typing import Annotated

from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import APIRouter, Depends

from .shemas import QueryParamsBase
from core.models import db_helper
from . import service


router = APIRouter(tags=["Vacancies"])

@router.get("/")
async def get_all(query: Annotated[QueryParamsBase, Depends()],
                  session: AsyncSession = Depends(db_helper.get_db)):
    params = query.model_dump(exclude_none = True)
    vacancies = await service.vacancy_get_one(params, session)
    return vacancies