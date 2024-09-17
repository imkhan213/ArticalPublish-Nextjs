import Link from "next/link"
import { useAppDispatch, useAuth } from "@/hooks/redux-hooks"
import { checkUser, IUser, logout } from "@/store/slices/auth-slice"
import { Skeleton } from "@mui/material"
import { FC, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import { useOnClickOutside } from "@/hooks/use-click-outside"
import { AnimatePresence, motion } from "framer-motion"

const Header = () => {
	const { isAuth, token } = useAuth()
	const dispatch = useAppDispatch()
	const [user, setUser] = useState<IUser | null>(null)
	const [userType, setuserType] = useState<any>(null)

	const getUser = async () => {
		if (token) {
			const data = await checkUser(token)
			
			if (data !== false) {
				setuserType(data.role);
				setUser(data)
			} else {
				_logout()
			}
		}
	}

	useEffect(() => {
		getUser()
	}, [token])

	const _logout = () => {
		dispatch(logout({}))
	}

	return (
		<div className={`bg-main-blue w-full h-[70px] p-4 flex justify-between items-center relative`}>
			<Link href="/" className="text-white text-lg md:text-2xl font-semibold">SP</Link>
			<HeaderNav />
			<HeaderMobileNav />
			<HeaderAuthButtons />
		</div>
	)
}

const HeaderNav = () => {
	const { pathname } = useRouter()

	return (
		<div className="gap-2 md:gap-4 text-white/80 hidden min-[500px]:flex">
			<Link
				href="/articles"
				className={`hover:text-white ${pathname === '/articles' ? 'text-white' : ''} duration-500 bg-white/10 px-2 py-[2px] rounded text-sm md:text-base`}
			>
				Articles
			</Link>
			<Link
				href="#"
				className={`hover:text-white ${pathname === '/publish' ? 'text-white' : ''} duration-500 bg-white/10 px-2 py-[2px] rounded text-sm md:text-base`}
			>
				Publish an article
			</Link>
			
		</div>
	)
}

const useScroll = () => {
	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY)
		})
	}, [])

	return scroll
}

const HeaderMobileNav = () => {
	const ref = useRef(null)
	const [isOpen, setIsOpen] = useState(false)
	useOnClickOutside(ref, () => setIsOpen(false))

	const scroll = useScroll()

	return (
		<div className={`${scroll > 72 ? 'fixed top-[2px]' : 'absolute top-[76px]'} left-0 min-[500px]:hidden flex items-center gap-2`} ref={ref}>
			<FontAwesomeIcon
				icon={faCircleArrowRight}
				onClick={() => setIsOpen(!isOpen)}
				className='text-main-blue text-2xl ml-1 cursor-pointer relative z-[10000000]'
			/>
			<AnimatePresence key='header-menu'>
				{isOpen &&
					<motion.div
						initial={{ x: -100, opacity: 1 }}
						animate={{ x: 0 }}
						exit={{ opacity: 0 }}
						className="flex gap-2 items-center"
					>
						<Link
							href="/articles"
							className="bg-main-blue text-white px-2 font-medium rounded text-sm"
						>
							Articles
						</Link>
						<Link
							href="#"
							className="bg-main-blue text-white px-2 font-medium rounded text-sm"
						>
							Publish an article
						</Link>
						 
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}

const HeaderAuthButtons = () => {
	return (
		<div className="flex items-center gap-2 text-white font-sans">
			<Link href="/auth/login_in" className="hover:text-[#DCDEFF] duration-500 text-sm | md:text-base">Log in</Link>
			|
			<Link href="/auth/sign_up" className="hover:text-[#DCDEFF] duration-500 text-sm | md:text-base">Sign up</Link>
		</div>
	)
}

const HeaderMenu: FC<{ user: IUser | null, logout: () => void, userType: any }> = (props) => {
	const [isMenu, setIsMenu] = useState(false)

	const menuRef = useRef(null)
	useOnClickOutside(menuRef, () => {
		setIsMenu(false)
	})


	return (
		<div className="relative" ref={menuRef}>
			  
		</div>
	)
}

export default Header