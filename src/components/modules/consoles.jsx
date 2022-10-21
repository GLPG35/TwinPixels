import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import switchModel from '../../../models/Nintendo_Switch.glb?url'
import seriesSModel from '../../../models/Xbox_Series_S.glb?url'
import ps4Model from '../../../models/PS4.glb?url'

export const NintendoSwitch = ({ ...props }) => {
	const group = useRef()
	const { nodes, materials } = useGLTF(switchModel)

	useFrame(state => {
		const t = state.clock.getElapsedTime()
		group.current.rotation.y = Math.sin(t / 0.5) / 15
		group.current.position.y = Math.sin(t) * 0.5
	})

	return (
		<group ref={group} {...props} dispose={null} castShadow>
			<mesh castShadow geometry={nodes.Cube.geometry} material={materials.switch_t}
			rotation={[0, 0.2, -0.5]} position={[0, 0.25, 0]} scale={[7, 7, 7]} />
		</group>
	)
}

export const XboxSeriesS = ({ ...props }) => {
	const group = useRef()
	const { nodes, materials } = useGLTF(seriesSModel)

	useFrame(state => {
		const t = state.clock.getElapsedTime()
		group.current.rotation.y = Math.sin(t / 0.5) / 15
		group.current.position.y = Math.sin(t) * 0.5
	})

	return (
		<group ref={group} {...props} dispose={null}>
			<mesh geometry={nodes.Cube.geometry} material={materials.xboxSeriesS_t}
			rotation={[0, 0.2, 1.5]} position={[0, 0.25, 0]} scale={[7, 7, 7]} />
		</group>
	)
}

export const PS4 = ({ ...props }) => {
	const group = useRef()
	const { nodes, materials } = useGLTF(ps4Model)

	useFrame(state => {
		const t = state.clock.getElapsedTime()
		group.current.rotation.y = Math.sin(t / 0.5) / 15
		group.current.position.y = Math.sin(t) * 0.5
	})

	return (
		<group ref={group} {...props} dispose={null} scale={[7, 7, 7]} rotation={[0.2, 0.2, 0]}>
			<mesh geometry={nodes.Cube.geometry} material={materials.ps4_t} position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
			<mesh geometry={nodes.Cube001.geometry} material={materials['ps4_t.001']} position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[0.9, 0.8, 1]} />
			<mesh geometry={nodes.Cube002.geometry} material={materials['ps4_t.002']} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
		</group>
	)
}

useGLTF.preload(ps4Model)
useGLTF.preload(switchModel)
useGLTF.preload(seriesSModel)