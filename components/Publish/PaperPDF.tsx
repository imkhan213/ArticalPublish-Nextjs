import React, { Component } from "react"
import { Typography } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import axios from "axios"

const RaperPDF: FC<{ paperPDF: FormData | null, setPaperPDF: (file: FormData) => void, apiScanId:any, setpaperFile?:any }> = (props) => {
	const [fileName, setFileName] = useState("")

	const [file, setFile] = useState<File | null>(null);//useState(null);
	//const [scanId, setScanId] = useState('');
	const [results, setResults] = useState(null);
	const [apiRes, setapiRes] = useState("");

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		
		const fileList = event.target.files;
		if (fileList && fileList.length > 0) {
			const ourfile = fileList[0];
			setFile(ourfile);
			setFileName(ourfile.name);
		
			const formData = new FormData();
			formData.append("file", ourfile);
			props.setPaperPDF(formData);

			props.setpaperFile(ourfile)

			/* plagiarism api for scan file */
			/*
			const plagiarismSubmit = async (ourfile: File) => {
				
				const formData = new FormData();
				formData.append('file', ourfile);
				formData.append("scanId", props.apiScanId)
			
				try {
				const response = await axios.post(baseURL+'/proxy/submitFile', formData);
				console.log(response);
				//setapiRes('Scan request successfully sent. after completion it will show score on view page.');
				} catch (error: any) {
					//setapiRes('Error submitting file:'+ error.message);
				}
			};
			setTimeout(function () { plagiarismSubmit(ourfile) })
			*/
			/* end api */
		}

		/*setFile(event.target.files[0]);

		let ourfile = event.currentTarget.files![0]
		setFileName(ourfile.name)
		
		const formData = new FormData()
		formData.append("file", ourfile)
		props.setPaperPDF(formData)*/


		/* plagiarism api for scan file */

		/*const plagiarismSubmit = async (filedata) => {
			
			const formData = new FormData();
			formData.append('file', filedata);
			formData.append("scanId", props.apiScanId)
		
			try {
			  const response = await axios.post(baseURL+'/proxy/submitFile', formData);
			  console.log(response);
			  //setapiRes('Scan request successfully sent. after completion it will show score on view page.');
			} catch (error) {
				//setapiRes('Error submitting file:'+ error.message);
			}
		};
		setTimeout(function () { plagiarismSubmit(event.target.files[0]) })*/

		/* end api */
	};
	
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
	
	//console.log(props.apiScanId);

	const handleSubmit = async () => {
		if (!file) return;
	
		const formData = new FormData();
		formData.append('file', file);
		formData.append("scanId", props.apiScanId)
	
		try {
		  const response = await axios.post(baseURL+'/proxy/submitFile', formData);
		  console.log(response);
		  setapiRes('Scan request successfully sent. after completion it will show score on view page.');
		} catch (error: any) {
			setapiRes('Error submitting file:'+ error.message);
		}
	};
	
	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {

		let file = e.currentTarget.files![0]
		
		if (file) {
		   
			setFileName(file.name)
     
			const formData = new FormData()
			formData.append("file", file)
			props.setPaperPDF(formData)

			const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

			try {
				const response = await axios.post(baseURL+'/proxy/checkPlagiarism', formData, {
				  headers: {
					'Content-Type': 'multipart/form-data',
				  },
				});
			  
				// Log the entire response object
				console.log(response);
			  
				// Handle the result from the backend (e.g., display the plagiarism check result)
				console.log(response.data);
			} catch (error: any) {
				console.error('Error:', error.message);
			}
		}
	}
	
	/*
	const uploadFile1 = (e: ChangeEvent<HTMLInputElement>) => {

		let file = e.currentTarget.files![0]
		
		const plagiarismHandler = async (e: any) => {
		    alert(e);
			let config = {
			method: 'GET',
			maxBodyLength: Infinity,
			url: 'https://api.copyleaks.com/v3/scans/credits',
			headers: { 
			  'Authorization': 'Bearer BA18BA5CA0DAF2C9E992FFCBA8AD6D177FD9FB0F66E5D691E8F29CA4A75D1F46',
			  'Access-Control-Allow-Credentials': true,
			  "Access-Control-Allow-Origin": "*",
			  'Access-Control-Allow-Methods': "GET,OPTIONS,PATCH,DELETE,POST,PUT"
			}
		  };
		  axios.request(config)
		  .then((response) => {
			console.log(JSON.stringify(response.data));
		  })
		  .catch((error) => {
			console.log(error);
		  });
		}
		

		if (file) {
		    setTimeout(function () { plagiarismHandler(file.name) })
			setFileName(file.name)
     
			const formData = new FormData()
			formData.append("file", file)
			props.setPaperPDF(formData)
		}
	}
	*/

	return (
		<div className="mt-6">
			<h3 className="md:text-lg mb-2">Please upload your paper in pdf format</h3>
			<div className="flex">
				<input id="article_paper_pdf" type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
				<label
					htmlFor="article_paper_pdf"
					className="
						bg-main-blue hover:bg-main-blue/90 text-white
						text-sm
						px-4
						duration-500
						font-medium
						h-[28px]
						rounded-md
						cursor-pointer
						flex justify-center items-center
						|
						md:text-base
						md:h-[30px]
						md:px-5
					"
				>
					{fileName
						? <Typography noWrap className="max-w-[100px] !font-zilla !font-medium">{fileName}</Typography>
						: "Upload"
					}
				</label>
	
			</div>
			
			{
			/*
			(!file) ? '' :
				<div class="mt-5">
				<button className="
						bg-main-blue hover:bg-main-blue/90 text-white
						text-sm
						px-4
						duration-500
						font-medium
						h-[28px]
						rounded-md
						cursor-pointer
						flex justify-center items-center
						|
						md:text-base
						md:h-[30px]
						md:px-5
					" onClick={handleSubmit}>Apply For Plagiarism Scan</button>

				{(apiRes) ?
				<div class="mt-5">
						<span>{apiRes}</span>
				</div>
				: ''
				}
				</div>
			*/
			}

			
		</div>
	)
}

export default RaperPDF