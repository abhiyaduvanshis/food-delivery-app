import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_END_POINT_URL


// const getRestaurentFood= async()=>{
//     try {
//         const token = localStorage.getItem('accessToken')
//         const response = await axios.get(API_URL+'restaurant/food/list',{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         return response
//     } catch (error) {
//         return error
//     }
// }



const getListData= async(apiCallUrl)=>{
    try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(API_URL+'/'+apiCallUrl,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}



const updateFoodFormData =async(apiCallUrl,inputForm,id,foodImage)=>{
    try {
        const token = localStorage.getItem('accessToken')

        const formData = new FormData()
        formData.append('foodCat', inputForm.foodCat)
        formData.append('name', inputForm.name)
        formData.append('description', inputForm.description)
        formData.append('price', inputForm.price)
        formData.append('offerPrice', inputForm.offerPrice)
        formData.append('available', inputForm.available)
        formData.append('image', foodImage)

        const response = await axios.put(API_URL+'/'+apiCallUrl,formData,id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}

const addFoodFormData =async(apiCallUrl,inputForm,foodImage)=>{

    try {
        const token = localStorage.getItem('accessToken')

        const formData = new FormData()
        formData.append('foodCat', inputForm.foodCat)
        formData.append('name', inputForm.name)
        formData.append('description', inputForm.description)
        formData.append('price', inputForm.price)
        formData.append('offerPrice', inputForm.offerPrice)
        formData.append('available', inputForm.available)
        formData.append('image', foodImage)

        const response = await axios.post(API_URL+'/'+apiCallUrl,formData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        return error
    }
    
}

// const getListDataById= async(apiCallUrl)=>{
//     try {
//         const token = localStorage.getItem('accessToken')
//         const response = await axios.get(API_URL+'/'+apiCallUrl,{
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         return response
//     } catch (error) {
//         return error
//     }
// }






const userService = {
    getListData,
    addFoodFormData,
    updateFoodFormData
}

export default userService