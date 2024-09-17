import { useOnClickOutside } from "@/hooks/use-click-outside"
import { faLightbulb } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AnimatePresence, motion } from "framer-motion"
import { FC, useRef, useState } from "react"

interface IChoice {
	title: string
	
	options: Array<{ value: any, label: string }>
	mode?: 'vertical' | 'horizontal'
	value: any
	setValue: (v: any) => void

	hint: {
		hintTitle: string
		hintPopupText: string
	} | null

	error?: string
}

const Choice: FC<IChoice> = (props) => {
	return (
		<div className="">
			<div className="mb-3 font-medium">
				{props.title}
			</div>
			<div className={props.mode === 'horizontal' || !props.mode ? 'flex items-center gap-4' : 'flex flex-col justify-center gap-1'}>
				{props.options.map((item, index) => {
					return (
						<div key={index} className="flex items-start gap-2 cursor-pointer" onClick={() => props.setValue(item.value)}>
							<div className="mt-[6px] min-w-[14px] min-h-[14px] max-w-[14px] max-h-[14px] bg-main-blue flex justify-center items-center rounded-full">
								{props.value === item.value &&
									<div className="w-[6px] h-[6px] bg-white rounded-full"></div>
								}
							</div>
							<div>{item.label}</div>
						</div>
					)
				})}
			</div>
			{props.error && <div className="mt-2 text-red-500 font-medium">{props.error}</div>}
			{props.hint &&
				<Hint title={props.hint.hintTitle} popupText={props.hint.hintPopupText} />
			}
		</div>
	)
}

const Hint: FC<{ title: string, popupText: string }> = (props) => {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef(null)
	useOnClickOutside(ref, () => setIsOpen(false))

	return (
		<div className="mt-3 relative" ref={ref}>
			<div className="underline inline-flex gap-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
				<FontAwesomeIcon icon={faLightbulb} className="text-main-blue text-sm mt-[6px]" />
				{props.title}
			</div>
			<AnimatePresence key='modal'>
				{isOpen &&
					<motion.div
						initial={{ opacity: 0, top: '32px' }}
						animate={{ opacity: 1, top: '30px' }}
						exit={{ opacity: 0, top: '32px' }}
						className="bg-white rounded-md p-2 absolute left-0 md:left-3 text-sm w-[300px] z-20"
					>
						<FontAwesomeIcon icon={faLightbulb} className="text-yellow-300 text-sm" /> {props.popupText}
					</motion.div>
				}
			</AnimatePresence>
		</div>
	)
}

export default Choice