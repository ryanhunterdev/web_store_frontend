import { useState, createContext } from 'react'

// context for other components to access - allows using the Provider
export const ModalContext = createContext()

export function ModalProvider(props) {

    const [ isModalOpen, setIsModalOpen ] = useState(false)

    const toggleCartModal = () => setIsModalOpen(!isModalOpen)

    return <ModalContext.Provider value={{ toggleCartModal, isModalOpen, setIsModalOpen }}>
        {props.children}
    </ModalContext.Provider>
}