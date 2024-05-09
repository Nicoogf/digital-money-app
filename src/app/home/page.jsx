import { connectMongoDB } from '@/db/db'
import React from 'react'

const page = () => {
  connectMongoDB()
  return (
    <div>page</div>
  )
}

export default page