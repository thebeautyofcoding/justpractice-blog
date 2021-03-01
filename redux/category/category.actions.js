import categoryTypes from './category.types'


export const startCreateCategory = () => ({
    type:categoryTypes.START_CREATE_CATEGORY
})

export const successCreateCategory = (category) => ({ type: categoryTypes.SUCCESS_CREATE_CATEGORY, payload: category}
)
export const failCreateCategory = () => ({
    type: categoryTypes.FAIL_CREATE_CATEGORY
})



