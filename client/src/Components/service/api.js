export const getConversations=async(id)=>{
    try {
        const response=await fetch(`http://localhost:4500/particularConversations/${id}`);
        return response.json()
    } catch (error) {
        console.log(error)
    }
}