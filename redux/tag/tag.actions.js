import tagTypes from './tag.types'


export const startCreateTag = () => ({
    type:tagTypes.START_CREATE_TAG
})

export const successCreateTag = (tags) => ({ type: tagTypes.SUCCESS_CREATE_TAG, payload: tags}
)
export const failCreateTag = () => ({
    type: tagTypes.FAIL_CREATE_TAG
})
