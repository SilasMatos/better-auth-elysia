import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { auth } from '../lib/auth'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Numero de senhas deve ser superior a 6').max(10, 'Password must be at most 20 characters long'),
})

type SignInSchema = z.infer<typeof signInSchema>

function SignIn() {
  const { register, handleSubmit, formState} = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = ({password, email} : SignInSchema ) => { 
    console.log('Email:', email)
    console.log('Password:', password)

    auth.signIn.email({email, password, callbackURL: 'http://localhost:5173'}, {
      onError(context) {
          if (context.error.message) {
          alert('falha ao entrar: ' )
          } else {
          alert('unknown error occurred')
          }
      },
    })

  }
  return (
    <div className='flex justify-center bg-zinc-100 h-screen items-center flex-col gap-4'>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='flex flex-col mb-4'>
          <label htmlFor="email">Email:</label>
          <input type="email" className='bg-gray-50 rounded-xl px-3 py-2  shadow'  {...register('email')} />

          
            {formState.errors.email && (
              <span className='text-red-600 font-medium text-sm'>{formState.errors.email.message}</span>
            )}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password">Password:</label>
          <input type="password" className='bg-gray-50 rounded-xl px-3 py-2  shadow' {...register('password')} />
            {formState.errors.password && (
              <span className='text-red-600 font-medium text-sm'>{formState.errors.password.message}</span>
            )}
        </div>
        <div className='flex justify-center items-center mt-4'>

        <button className='bg-blue-500 text-white font-semibold text-sm  px-4 py-2 rounded-lg shadow' type="submit" disabled={formState.isSubmitting}>Sign In</button>
        </div> 
      </form>
      
    </div>
  )
}

export default SignIn
