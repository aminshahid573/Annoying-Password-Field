"use client"

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    const torusKnot = new THREE.Mesh(geometry, material)

    scene.add(torusKnot)

    camera.position.z = 30

    const animate = () => {
      requestAnimationFrame(animate)

      torusKnot.rotation.x += 0.01
      torusKnot.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
}

