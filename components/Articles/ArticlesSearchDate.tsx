import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDateTimePicker, MobileDateTimePicker } from '@mui/x-date-pickers'
import { TextField } from '@mui/material'
import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { Dayjs } from 'dayjs'
import React from 'react'
import { useScreenSize } from '@/hooks/use-screen-size'

interface IArticlesSearchDate {
	value: string
	setValue: (v: string | ((v: string) => string)) => void

	submitHandler: () => void
}

const ArticlesSearchDate: FC<IArticlesSearchDate> = (props) => {
	const screenSize = useScreenSize()

	const handleChange = (e: Dayjs | null) => {
		if (e) {
			try {
				props.setValue(e.toISOString())
			} catch {}
		}
	}

	const icon = () => {
		return <FontAwesomeIcon icon={faCalendarDay} className='text-base' />
	}

	const renderInput = (params: any) =>
		<TextField
			{...params}
			error={false}
			onKeyDown={(e) => { e.key === "Enter" && props.submitHandler() }}
			sx={{
				"& .MuiOutlinedInput-input": {
					paddingLeft: '8px',
				},
				'& fieldset': {
					border: 'none',
					outline: 'none',
				}
			}}
		/>

	return (
		<div className="">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{screenSize > 767
					? <DesktopDateTimePicker
						ampm={false}
						value={props.value}
						onChange={handleChange}
						components={{
							OpenPickerIcon: icon
						}}
						InputProps={{
							sx: { height: '30px', width: '300px', border: '2px solid #32335A', fontSize: '14px' }
						}}
						renderInput={renderInput}
					/>
					: <MobileDateTimePicker
						ampm={false}
						value={props.value}
						onChange={handleChange}
						components={{
							OpenPickerIcon: icon
						}}
						InputProps={{
							sx: { height: '30px', border: '2px solid #32335A', fontSize: '14px' }
						}}
						renderInput={renderInput}
					/>
				}
			</LocalizationProvider>
		</div>
	)
}

export default React.memo(ArticlesSearchDate)