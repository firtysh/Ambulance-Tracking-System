import  {useForm} from 'react-hook-form'
import { useState } from 'react'
import {signinAmbulance,signinHospital,signinUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import  useAuth  from '../hooks/useAuth'
const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()
  const [type, setType] = useState('us')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setUser,setToken} = useAuth()
  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true)
    try {
    if(type === 'us'){
      const res = await signinUser(data)
      console.log(res);
      setUser(res)
      setToken(res.token)
      navigate('/home')
    }else if(type === 'ha'){
      const res = await signinHospital(data)
      console.log(res);
      setUser(res)
      setToken(res.token)
      navigate('/home')
    }else if(type === 'ad'){
     const res = await signinAmbulance(data)
     console.log(res);
     setUser(res)
     setToken(res.token)
      navigate('/home')
    }
  }
  catch(err){
    window.alert('An error occured')
    console.log(err);
    setLoading(false)
  }
  }
  const handleFormChange = (e) => {
    setType(e.target.value)
    reset()
  }
  return (
    <div className='max-w-screen-md mx-auto mt-10'>
      <h1 className='text-center font-bold text-2xl underline underline-offset-2'>Sign In</h1>
      <form className="form-control w-full max-w-xs mx-auto gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="label">
          <span className="label-text">Sign In as</span>
        </div>
        <select className="select select-bordered"  value={type}  onChange={handleFormChange}>
          <option value={'us'}>User</option>
          <option value={'ha'}>Hospital Authority</option>
          <option value={'ad'}>Ambulance Driver</option>
        </select>
        <div className="label">
          <span className="label-text">Email : </span>
        </div>
        <input type="email" className='input input-bordered w-full max-w-xs' {...register('email',{required:true})} />
        <div className="label">
          <span className="label-text">Password : </span>
        </div>
        <input type="password" className='input input-bordered w-full max-w-xs' {...register('password',{required:true})} />
        <button className="btn" type='submit' disabled={loading}>{loading && <span className="loading loading-spinner"></span>}Sign In</button>
      </form>
    </div>
  )
}

export default Signin