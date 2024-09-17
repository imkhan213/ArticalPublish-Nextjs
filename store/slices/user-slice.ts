import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { instance } from '@/components/Layout';
 
export async function getUsers() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/user`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export async function getAdminUsers() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/user/adminusers`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export async function getSiteUsers() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/user/siteusers`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export async function getAllOrders() {
	const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiUrl = baseURL+`/orders/getallorders`;
  	const response = await fetch(apiUrl);

  	if (!response.ok) {
    	throw new Error('Failed to fetch user details');
  	}
  	return response.json();
}

export const getOrderById = async (orderId: string): Promise<any> => {
	const resp = await instance.get(`orders/detail/${orderId}`)
	return resp.data
}

export const userCreate = createAsyncThunk(
	'user/create',
	async (data: any) => {
	  try {
		const response = await instance.post('/auth/register', {
		  firstName: data.fname,
		  lastName: data.lname,
		  email: data.email,
		  role: data.role,
		  permissions: data.permissions,
		  isVerify: data.isVerify,
		  password: data.password,
		  institutionInfo: {
			institutionName: data.institution,
			position: data.areaOfInterest ? null : data.position,
			areaOfInterest: data.position ? null : data.areaOfInterest,
		  },
		});
		data.afterCreationHandler(response.data)
		return response.data;
	  } catch (error: any) {
		throw new Error('Failed to create user');
	  }
	}
  );

//   export const userUpdate = createAsyncThunk(
// 	'user/update',
// 	async (userData: any) => {
// 	  console.log(userData);
// 	  try {
// 		const response = await instance.put('user/updateinfo', {
// 			firstName: userData.fname,
// 			lastName: userData.lname,
// 			email: userData.email,
// 			role: userData.role,
// 			institutionInfo: {
// 				institutionName: userData.institution,
// 				position: userData.areaOfInterest ? null : userData.position,
// 				areaOfInterest: userData.position ? null : userData.areaOfInterest,
// 			},
// 			userId:userId
// 		}, {
// 			headers: {
// 				authorization: `Bearer ${userData.token}`
// 			}
// 		})
		
// 	} catch (err: any) {
// 		//userData.setErrors(handleRepsErrors(err))
// 	}

// 	}
//   );
