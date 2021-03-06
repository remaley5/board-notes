"""empty message

Revision ID: 9e2a31c49cce
Revises:
Create Date: 2020-12-13 15:46:31.364591

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9e2a31c49cce'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('photo_sketchbooks')
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password_digest', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('photo_url', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sketchbooks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('color', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('archived', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('boards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sketchbook_id', sa.Integer(), nullable=False),
    sa.Column('photo_url', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['sketchbook_id'], ['sketchbooks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('photo_sketchbooks')
    op.drop_table('boards')
    op.drop_table('sketchbooks')
    op.drop_table('photos')
    op.drop_table('users')
    # ### end Alembic commands ###
