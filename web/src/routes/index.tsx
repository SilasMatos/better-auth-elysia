import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div className="h-screen bg-zinc-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" backdrop-blur-sm rounded-xl  border-zinc-300 p-10 w-[90%] max-w-sm text-center"
      >
        <h1 className="text-zinc-800 text-3xl italic font-semibold mb-3">
          Welcome Home
        </h1>
      </motion.div>
    </div>
  )
}
