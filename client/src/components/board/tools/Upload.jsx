import React, { useState, useContext, useEffect } from 'react';
import {setPhotos} from '../../../state'
import { AuthContext } from '../../../context'

function Upload({ setLoading, allPhotos, setAllPhotos }) {
	const [photoFile, setPhotoFile] = useState(null);
	const { fetchWithCSRF, currentUserId } = useContext(AuthContext);

	const handleChange = (e) => {
		e.preventDefault()
		setLoading(true)
		setPhotoFile(e.target.files[0]);
	};

	useEffect(() => {
		const formData = new FormData();
		formData.append("file", photoFile);
		// console.log(photoFile)
		if(photoFile){
			postPhoto(formData);
		}
	}, [photoFile])


	const postPhoto = async (formData) => {
		console.log('CURRENT USER ID', currentUserId)
		let response = await fetchWithCSRF(`/api-photos/${currentUserId}`, {
			method: 'POST',
			body: formData,
		});
		if (response.ok) {
			const data = await response.json()
			console.log('photo in response', data.photo)
			setPhotos([...allPhotos, data.photo])
			setAllPhotos([...allPhotos, data.photo])
			setLoading(false)
		}
	};

	return (
		<div className='upload-con'>
			<form className='content__add'>
				<label htmlFor="file-upload" className="add-btn">
					+
				</label>
				<input
					id='file-upload'
					onChange={handleChange}
					type='file'
					name='file'
				></input>
				<br />
			</form>
		</div>
	);
}

export default Upload;
