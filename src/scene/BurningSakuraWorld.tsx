import { useMemo, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useScrollStore } from '../hooks/useScrollStore'

const C = {
  obsidian: '#090909',
  bone: '#F1EBDD',
  vermilion: '#E52B24',
  crimson: '#8C101B',
  ember: '#FF6A2A',
  gold: '#BFA36A',
  char: '#1a1210',
}

const WORLD_END = -238
const CAM_START_Z = 16

function cameraZ(p: number) {
  const e = p * p * (3 - 2 * p)
  return CAM_START_Z + (WORLD_END - CAM_START_Z) * e
}

function cameraX(p: number) {
  return (
    Math.sin(p * Math.PI * 2.2) * 4.5 +
    Math.sin(p * Math.PI * 5.1 + 1.3) * 1.6
  )
}

function cameraY(p: number) {
  return 2.2 + Math.sin(p * Math.PI * 1.7) * 1.4 - p * 0.6
}

function windAt(p: number): number {
  const zones = [0.6, 0.9, 1.5, 1.1, 0.8, 1.3, 0.7, 0.5, 0.45, 0.4]
  const f = Math.min(0.999, Math.max(0, p)) * (zones.length - 1)
  const i = Math.floor(f)
  const t = f - i
  return zones[i] + (zones[Math.min(i + 1, zones.length - 1)] - zones[i]) * t
}

function CameraRig({
  enabled,
  progressRef,
  velocityRef,
  directionRef,
}: {
  enabled: boolean
  progressRef?: { current: number }
  velocityRef?: { current: number }
  directionRef?: { current: number }
}) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())

  useFrame((_, dt) => {
    const p = progressRef?.current ?? 0
    const k = enabled ? 1 - Math.pow(0.0015, dt) : 1
    const nx = cameraX(p)
    const ny = cameraY(p)
    const nz = cameraZ(p)
    camera.position.x += (nx - camera.position.x) * k
    camera.position.y += (ny - camera.position.y) * k
    camera.position.z += (nz - camera.position.z) * k
    // Bridge-path transition: subtle arc between zones
    const zone = Math.floor(p * 8)
    const zoneProgress = (p * 8) % 1
    const arcFactor = Math.sin(zoneProgress * Math.PI) * 0.02
    const arcX = zone % 2 === 0 ? arcFactor : -arcFactor
    const arcY = Math.floor(zone / 2) % 2 === 0 ? arcFactor : -arcFactor
    target.current.set(
      cameraX(Math.min(1, p + 0.03)) + arcX,
      cameraY(Math.min(1, p + 0.03)) + 0.2 + arcY,
      cameraZ(Math.min(1, p + 0.03)) - 6
    )
    camera.lookAt(target.current)
  })
  return null
}

function FogRig() {
  const { scene } = useThree()
  useEffect(() => {
    scene.fog = new THREE.FogExp2(C.obsidian, 0.014)
    scene.background = new THREE.Color(C.obsidian)
    return () => {
      scene.fog = null
    }
  }, [scene])
  return null
}

function ToriiGate({ z }: { z: number }) {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: C.vermilion,
        roughness: 0.72,
        metalness: 0.08,
        emissive: new THREE.Color(C.crimson),
        emissiveIntensity: 0.12,
      }),
    [],
  )
  const dark = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3a0c0a', roughness: 0.9 }),
    [],
  )
  return (
    <group position={[0, 0, z]}>
      <mesh material={mat} position={[-3.4, 3.2, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 6.4, 12]} />
      </mesh>
      <mesh material={mat} position={[3.4, 3.2, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 6.4, 12]} />
      </mesh>
      <mesh material={dark} position={[0, 6.1, 0]}>
        <boxGeometry args={[9.2, 0.42, 0.62]} />
      </mesh>
      <mesh material={mat} position={[0, 5.35, 0]}>
        <boxGeometry args={[8.2, 0.34, 0.5]} />
      </mesh>
      <mesh material={dark} position={[0, 6.55, 0]}>
        <boxGeometry args={[10, 0.22, 0.7]} />
      </mesh>
    </group>
  )
}

function SakuraTree({
  position,
  scale = 1,
  seed = 0,
}: {
  position: [number, number, number]
  scale?: number
  seed?: number
}) {
  const bark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: C.char,
        roughness: 0.95,
        metalness: 0.05,
      }),
    [],
  )
  const blossom = useMemo(() => {
    const mats: THREE.MeshStandardMaterial[] = []
    const cols = [C.crimson, C.vermilion, '#5c0a12', C.ember]
    for (let i = 0; i < cols.length; i++) {
      mats.push(
        new THREE.MeshStandardMaterial({
          color: cols[i],
          emissive: new THREE.Color(cols[i]),
          emissiveIntensity: i === 3 ? 0.55 : 0.22,
          roughness: 0.6,
        }),
      )
    }
    return mats
  }, [])

  const branches = useMemo(() => {
    const out: { pos: [number, number, number]; rot: [number, number, number]; len: number; r: number }[] = []
    let s = seed * 9301 + 49297
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + rnd() * 0.8
      const tilt = 0.5 + rnd() * 0.7
      const len = 1.6 + rnd() * 1.8
      out.push({
        pos: [Math.cos(a) * len * 0.35, 2.6 + rnd() * 1.4, Math.sin(a) * len * 0.35],
        rot: [Math.cos(a) * tilt, 0, -Math.sin(a) * tilt],
        len,
        r: 0.08 + rnd() * 0.06,
      })
    }
    return out
  }, [seed])

  const clusters = useMemo(() => {
    const out: { pos: [number, number, number]; s: number; m: number }[] = []
    let s = seed * 7919 + 104729
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    for (let i = 0; i < 14; i++) {
      out.push({
        pos: [(rnd() - 0.5) * 5.2, 3.2 + rnd() * 2.6, (rnd() - 0.5) * 5.2],
        s: 0.35 + rnd() * 0.55,
        m: Math.floor(rnd() * 4),
      })
    }
    return out
  }, [seed])

  return (
    <group position={position} scale={scale}>
      <mesh material={bark} position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.14, 0.3, 3.2, 8]} />
      </mesh>
      {branches.map((b, i) => (
        <mesh key={i} material={bark} position={b.pos} rotation={b.rot}>
          <cylinderGeometry args={[b.r * 0.4, b.r, b.len, 6]} />
        </mesh>
      ))}
      {clusters.map((c2, i) => (
        <mesh key={i} material={blossom[c2.m]} position={c2.pos}>
          <icosahedronGeometry args={[c2.s, 0]} />
        </mesh>
      ))}
    </group>
  )
}

function TreeLine() {
  const trees = useMemo(() => {
    const out: { pos: [number, number, number]; scale: number; seed: number }[] = []
    let s = 12345
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    for (let i = 0; i < 46; i++) {
      const z = -6 - rnd() * 246
      const side = rnd() > 0.5 ? 1 : -1
      out.push({
        pos: [side * (5.5 + rnd() * 9), 0, z],
        scale: 0.8 + rnd() * 1.3,
        seed: i + 1,
      })
    }
    return out
  }, [])
  return (
    <group>
      {trees.map((t, i) => (
        <SakuraTree key={i} position={t.pos} scale={t.scale} seed={t.seed} />
      ))}
    </group>
  )
}

function makePetalGeometry(): THREE.ShapeGeometry {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.bezierCurveTo(0.05, 0.1, 0.22, 0.22, 0.22, 0.42)
  s.bezierCurveTo(0.22, 0.6, 0.1, 0.68, 0, 0.58)
  s.bezierCurveTo(-0.1, 0.68, -0.22, 0.6, -0.22, 0.42)
  s.bezierCurveTo(-0.22, 0.22, -0.05, 0.1, 0, 0)
  return new THREE.ShapeGeometry(s, 6)
}

type PetalSeed = {
  x: number
  y: number
  z: number
  rx: number
  ry: number
  rz: number
  vr: number
  fall: number
  drift: number
  scale: number
  layer: number
  phase: number
}

function FallingPetals({
  count,
  enabled,
  progressRef,
  velocityRef,
  directionRef,
}: {
  count: number
  enabled: boolean
  progressRef?: { current: number }
  velocityRef?: { current: number }
  directionRef?: { current: number }
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geo = useMemo(() => makePetalGeometry(), [])
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.55,
        metalness: 0.05,
        side: THREE.DoubleSide,
        emissiveIntensity: 0.35,
      }),
    [],
  )

  const seeds = useMemo<PetalSeed[]>(() => {
    const out: PetalSeed[] = []
    let s = 777
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    for (let i = 0; i < count; i++) {
      const layer = i % 3
      out.push({
        x: (rnd() - 0.5) * 36,
        y: rnd() * 16 - 2,
        z: (rnd() - 0.5) * 30,
        rx: rnd() * Math.PI * 2,
        ry: rnd() * Math.PI * 2,
        rz: rnd() * Math.PI * 2,
        vr: 0.4 + rnd() * 2.2,
        fall: 0.25 + rnd() * 0.65,
        drift: (rnd() - 0.5) * 0.8,
        scale: (layer === 0 ? 0.5 : layer === 1 ? 0.9 : 1.5) * (0.7 + rnd() * 0.7),
        layer,
        phase: rnd() * Math.PI * 2,
      })
    }
    return out
  }, [count])

  const color = useMemo(() => new THREE.Color(), [])
  const palette = useMemo(() => {
    const cols = ['#8C101B', '#E52B24', '#FF6A2A', '#6b6560', '#c9beb2', '#3a3532']
    const floats: [number, number, number][] = []
    for (const c of cols) {
      const col = new THREE.Color(c)
      floats.push([col.r, col.g, col.b])
    }
    return floats
  }, [])

  useFrame(({ clock, camera }, dt) => {
    const mesh = meshRef.current
    if (!mesh || !enabled) return
    const t = clock.elapsedTime
    const stProgress = progressRef?.current ?? 0
    const gust = THREE.MathUtils.clamp(
      (velocityRef?.current ?? 0) * 0.0018,
      -2.4,
      2.4,
    )
    const dir = directionRef?.current ?? 1
    const d = Math.min(dt, 0.05)

    for (let i = 0; i < seeds.length; i++) {
      const p = seeds[i]
      const flutter = Math.sin(t * p.vr + p.phase)
      p.x += (p.drift + gust * (p.layer === 2 ? 1.6 : 1) * 14 * 0.016 * windAt(stProgress) + dir * windAt(stProgress) * 0.01) * d * 60 * 0.016
      p.y -= p.fall * d * (0.8 + windAt(stProgress) * 0.4)
      p.z += (gust * 0.4 + Math.sin(t * 0.3 + p.phase) * 0.01) * d * 60
      p.rx += p.vr * d * 0.8
      p.rz += flutter * d

      if (p.y < -3) {
        p.y = 14 + Math.random() * 4
        p.x = (Math.random() - 0.5) * 36
      }
      if (p.x - camera.position.x > 22) p.x -= 44
      if (p.x - camera.position.x < -22) p.x += 44
      if (p.z > 16) p.z -= 34
      if (p.z < -18) p.z += 34

      dummy.position.set(p.x, p.y, camera.position.z + p.z)
      dummy.rotation.set(p.rx, p.ry, p.rz)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      const ci =
        stProgress > 0.12 && stProgress < 0.4
          ? (i + Math.floor(t)) % 6
          : stProgress > 0.85
            ? 4 + (i % 2)
            : i % 3
      const pc = palette[ci % palette.length]
      color.setRGB(pc[0], pc[1], pc[2])
      mesh.setColorAt(i, color)
    }
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    for (let i = 0; i < seeds.length; i++) {
      const pc = palette[i % 3]
      color.setRGB(pc[0], pc[1], pc[2])
      mesh.setColorAt(i, color)
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [seeds, palette, color])

  return (
    <instancedMesh ref={meshRef} args={[geo, mat, count]} frustumCulled={false} castShadow={false}>
      <primitive object={geo} attach="geometry" />
      <primitive object={mat} attach="material" />
    </instancedMesh>
  )
}

function EmberField({
  count,
  enabled,
  progressRef,
  velocityRef,
  directionRef,
}: {
  count: number
  enabled: boolean
  progressRef?: { current: number }
  velocityRef?: { current: number }
  directionRef?: { current: number }
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const { camera } = useThree()

  const { geo, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const seeds: { y: number; sp: number; ph: number }[] = []
    let s = 4242
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    const ember = new THREE.Color(C.ember)
    const gold = new THREE.Color(C.gold)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rnd() - 0.5) * 40
      positions[i * 3 + 1] = rnd() * 12
      positions[i * 3 + 2] = (rnd() - 0.5) * 36
      const c = rnd() > 0.5 ? ember : gold
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      seeds.push({ y: positions[i * 3 + 1], sp: 0.4 + rnd() * 1.6, ph: rnd() * 6.28 })
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return { geo, seeds }
  }, [count])

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.09,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  )

  useFrame(({ clock }, dt) => {
    if (!enabled || !pointsRef.current) return
    const t = clock.elapsedTime
    const stProgress = progressRef?.current ?? 0
    const burstK = Math.min(1, Math.abs(velocityRef?.current ?? 0) / 2200)
    mat.size = 0.07 + burstK * 0.12
    mat.opacity = 0.55 + burstK * 0.4
    const pos = geo.attributes.position as THREE.BufferAttribute
    const d = Math.min(dt, 0.05)
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + seeds[i].sp * d * (0.6 + burstK * 2.4)
      let x = pos.getX(i) + Math.sin(t * 0.7 + seeds[i].ph) * d * 0.6 + (directionRef?.current ?? 1) * burstK * d * 6
      let z = pos.getZ(i) + (velocityRef?.current ?? 0) / 2200 * d * 3
      if (y > 13) {
        y = -1
        x = (Math.random() - 0.5) * 40
      }
      if (x - camera.position.x > 22) x -= 44
      if (x - camera.position.x < -22) x += 44
      if (z > 18) z -= 40
      if (z < -22) z += 40
      pos.setX(i, x)
      pos.setY(i, y)
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    pointsRef.current.position.z = camera.position.z
  })

  return <points ref={pointsRef} args={[geo, mat]} frustumCulled={false} />
}

function VolcanicForge({ z }: { z: number }) {
  const glowRef = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (glowRef.current) glowRef.current.intensity = 26 + Math.sin(clock.elapsedTime * 2.3) * 6
  })
  const rock = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#141010', roughness: 0.95 }),
    [],
  )
  const lava = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: C.ember,
        emissive: new THREE.Color(C.ember),
        emissiveIntensity: 2.2,
        roughness: 0.4,
      }),
    [],
  )
  return (
    <group position={[0, -1, z]}>
      <mesh material={rock} position={[0, 5, -16]}>
        <coneGeometry args={[13, 16, 7]} />
      </mesh>
      <mesh material={lava} position={[0, 11.6, -16]}>
        <coneGeometry args={[3.4, 3, 7]} />
      </mesh>
      <mesh material={lava} position={[0, -0.4, 2]}>
        <cylinderGeometry args={[3.2, 3.6, 0.3, 24]} />
      </mesh>
      <mesh material={rock} position={[0, -1.4, 2]}>
        <cylinderGeometry args={[4.2, 4.8, 1.6, 24]} />
      </mesh>
      <pointLight ref={glowRef} position={[0, 3, 2]} color={C.ember} intensity={26} distance={40} />
      <pointLight position={[0, 13, -16]} color={C.vermilion} intensity={30} distance={60} />
    </group>
  )
}

function ProjectSteles() {
  const steles = useMemo(() => {
    const defs = [
      { z: -72, x: -5.5, h: 7 },
      { z: -86, x: 5.5, h: 8.5 },
      { z: -100, x: -5, h: 7.5 },
      { z: -114, x: 5.8, h: 8 },
      { z: -128, x: -5.2, h: 7.2 },
    ]
    return defs
  }, [])
  const stone = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#171312',
        roughness: 0.88,
        metalness: 0.12,
      }),
    [],
  )
  const rune = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: C.gold,
        emissive: new THREE.Color(C.gold),
        emissiveIntensity: 0.8,
        roughness: 0.4,
      }),
    [],
  )
  return (
    <group>
      {steles.map((s, i) => (
        <group key={i} position={[s.x, 0, s.z]}>
          <mesh material={stone} position={[0, s.h / 2, 0]}>
            <boxGeometry args={[2.2, s.h, 0.5]} />
          </mesh>
          <mesh material={rune} position={[0, s.h * 0.72, 0.28]}>
            <boxGeometry args={[0.9, 0.9, 0.06]} />
          </mesh>
          <mesh material={stone} position={[0, 0.3, 0]}>
            <boxGeometry args={[3, 0.6, 1.2]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CeremonialHall({ z }: { z: number }) {
  const stone = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#151110', roughness: 0.9 }),
    [],
  )
  const gold = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: C.gold,
        emissive: new THREE.Color(C.gold),
        emissiveIntensity: 0.5,
        roughness: 0.35,
        metalness: 0.6,
      }),
    [],
  )
  const cols = useMemo(() => {
    const out: [number, number, number][] = []
    for (let i = 0; i < 6; i++) {
      out.push([-4.5, 0, -i * 4])
      out.push([4.5, 0, -i * 4])
    }
    return out
  }, [])
  return (
    <group position={[0, 0, z]}>
      {cols.map((p, i) => (
        <mesh key={i} material={stone} position={[p[0], 4, p[2]]}>
          <cylinderGeometry args={[0.45, 0.55, 8, 10]} />
        </mesh>
      ))}
      <mesh material={stone} position={[0, 8.4, -10]}>
        <boxGeometry args={[12, 0.6, 26]} />
      </mesh>
      <mesh material={gold} position={[0, 6.2, -22]}>
        <torusGeometry args={[2.2, 0.12, 8, 32]} />
      </mesh>
      <pointLight position={[0, 5, -10]} color={C.gold} intensity={14} distance={30} />
    </group>
  )
}

function SkillConstellation({ z }: { z: number }) {
  const { geo, lineGeo } = useMemo(() => {
    const n = 42
    const pts = new Float32Array(n * 3)
    const linePts: number[] = []
    let s = 999
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }
    for (let i = 0; i < n; i++) {
      pts[i * 3] = (rnd() - 0.5) * 22
      pts[i * 3 + 1] = 1 + rnd() * 10
      pts[i * 3 + 2] = (rnd() - 0.5) * 30
    }
    for (let i = 0; i < n - 1; i++) {
      if (rnd() > 0.45) {
        linePts.push(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2])
        linePts.push(pts[(i + 1) * 3], pts[(i + 1) * 3 + 1], pts[(i + 1) * 3 + 2])
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pts, 3))
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePts), 3))
    return { geo, lineGeo }
  }, [])
  const dotMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: C.bone,
        size: 0.16,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  )
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: C.gold,
        transparent: true,
        opacity: 0.28,
      }),
    [],
  )
  const grp = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (grp.current) grp.current.rotation.y = Math.sin(clock.elapsedTime * 0.07) * 0.12
  })
  return (
    <group ref={grp} position={[0, 0, z]}>
      <points args={[geo, dotMat]} />
      <lineSegments args={[lineGeo, lineMat]} />
    </group>
  )
}

function PathTorches({ z }: { z: number }) {
  const glow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: C.ember,
        emissive: new THREE.Color(C.ember),
        emissiveIntensity: 1.6,
      }),
    [],
  )
  const post = useMemo(
    () => new THREE.MeshStandardMaterial({ color: C.char, roughness: 0.9 }),
    [],
  )
  const spots = useMemo(() => {
    const out: { pos: [number, number, number]; phase: number }[] = []
    for (let i = 0; i < 8; i++) {
      const t = i / 7
      out.push({
        pos: [Math.sin(t * Math.PI * 1.6) * 5 - 0.5, 0, z - t * 26],
        phase: i * 1.7,
      })
    }
    return out
  }, [z])
  const refs = useRef<(THREE.PointLight | null)[]>([])
  useFrame(({ clock }) => {
    spots.forEach((sp, i) => {
      const l = refs.current[i]
      if (l) l.intensity = 6 + Math.sin(clock.elapsedTime * 3 + sp.phase) * 2.2
    })
  })
  return (
    <group>
      {spots.map((sp, i) => (
        <group key={i} position={sp.pos}>
          <mesh material={post} position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.06, 0.09, 2.2, 6]} />
          </mesh>
          <mesh material={glow} position={[0, 2.35, 0]}>
            <sphereGeometry args={[0.22, 10, 10]} />
          </mesh>
          <pointLight
            ref={(el) => {
              refs.current[i] = el
            }}
            position={[0, 2.4, 0]}
            color={C.ember}
            intensity={6}
            distance={9}
          />
        </group>
      ))}
    </group>
  )
}

function FinalLantern({ z }: { z: number }) {
  const lightRef = useRef<THREE.PointLight>(null)
  const body = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a1a12',
        emissive: new THREE.Color(C.ember),
        emissiveIntensity: 0.9,
        roughness: 0.6,
      }),
    [],
  )
  useFrame(({ clock }) => {
    if (lightRef.current) lightRef.current.intensity = 10 + Math.sin(clock.elapsedTime * 1.4) * 2.5
  })
  return (
    <group position={[0, 0, z]}>
      <mesh material={body} position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.1, 6]} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <coneGeometry args={[0.75, 0.5, 6]} />
        <meshStandardMaterial color={C.char} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 1.9, 6]} />
        <meshStandardMaterial color={C.char} roughness={0.9} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 2.4, 0]} color={C.ember} intensity={10} distance={16} />
    </group>
  )
}

function AshGround() {
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0c0a09',
        roughness: 1,
      }),
    [],
  )
  return (
    <mesh material={mat} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -110]}>
      <planeGeometry args={[80, 300]} />
    </mesh>
  )
}

function World({
  petalCount,
  enabled,
  progressRef,
  velocityRef,
  directionRef,
}: {
  petalCount: number
  enabled: boolean
  progressRef?: { current: number }
  velocityRef?: { current: number }
  directionRef?: { current: number }
}) {
  return (
    <>
      <FogRig />
      <CameraRig
        enabled={enabled}
        progressRef={progressRef}
        velocityRef={velocityRef}
        directionRef={directionRef}
      />
      <ambientLight intensity={0.16} color={'#c4b8a8'} />
      <directionalLight position={[6, 12, 4]} intensity={0.35} color={'#ffd9b0'} />
      <hemisphereLight args={['#2a1810', '#050404', 0.25]} />
      <AshGround />
      <ToriiGate z={0} />
      <TreeLine />
      <FallingPetals count={petalCount} enabled={enabled} />
      <EmberField count={Math.floor(petalCount * 0.35)} enabled={enabled} />
      <VolcanicForge z={-46} />
      <ProjectSteles />
      <CeremonialHall z={-142} />
      <SkillConstellation z={-178} />
      <PathTorches z={-196} />
      <FinalLantern z={-232} />
    </>
  )
}

export default function BurningSakuraWorld({
  enabled,
  progressRef,
  velocityRef,
  directionRef,
}: {
  enabled: boolean
  progressRef?: { current: number }
  velocityRef?: { current: number }
  directionRef?: { current: number }
}) {
  const [petalCount, setPetalCount] = useState(520)

  useEffect(() => {
    const w = window.innerWidth
    if (w < 640) setPetalCount(260)
    else if (w < 1100) setPetalCount(400)
    else setPetalCount(620)
  }, [setPetalCount])

  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ fov: 55, near: 0.1, far: 260, position: [0, 2.2, CAM_START_Z] }}
      onCreated={({ gl }) => {
        gl.setClearColor(C.obsidian, 1)
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <World
        petalCount={petalCount}
        enabled={enabled}
        progressRef={progressRef}
        velocityRef={velocityRef}
        directionRef={directionRef}
      />
    </Canvas>
  )
}
