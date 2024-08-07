"""init2

Revision ID: 1547d1dc8e62
Revises: 4de8c9fe9f0f
Create Date: 2024-06-27 00:59:55.033740

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1547d1dc8e62'
down_revision: Union[str, None] = '4de8c9fe9f0f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('salaries', sa.Column('vacancy_id', sa.String(), nullable=False))
    op.create_unique_constraint(None, 'salaries', ['vacancy_id'])
    op.create_foreign_key(None, 'salaries', 'vacancies', ['vacancy_id'], ['id'])
    op.add_column('vacancies', sa.Column('salary_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'vacancies', 'salaries', ['salary_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'vacancies', type_='foreignkey')
    op.drop_column('vacancies', 'salary_id')
    op.drop_constraint(None, 'salaries', type_='foreignkey')
    op.drop_constraint(None, 'salaries', type_='unique')
    op.drop_column('salaries', 'vacancy_id')
    # ### end Alembic commands ###
