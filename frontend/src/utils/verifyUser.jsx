import axios from 'axios'

const verifyUser = async () => {
    if(localStorage.getItem('user') !== null) {
        const { token, email, password } = JSON.parse(localStorage.getItem('user'));
        try {
            const test = await axios.get(`http://localhost:3001/verifyjwt`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const { data } = test;
            if (data.email === email && data.password === password) {
                return { cargo: data.cargo }
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    } else {
        return false
    }
}

const verifyCargo = async () => {
    const result = await verifyUser();
    if (!result) {
        localStorage.removeItem('user')
        return false
    }
    return (result.cargo)
}

export default verifyCargo