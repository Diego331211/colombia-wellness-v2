"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface CityCardProps {
  name: string
  image: string
}

export default function CityCard({ name, image }: CityCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-xl max-w-96 mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className={`aspect-square relative`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
        </div>
      </div>
    </motion.div>
  )
}
