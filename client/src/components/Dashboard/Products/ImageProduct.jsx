import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import Transition from "../../Transition/Transition";


export default function ImageProduct(){

    const location = useLocation();
    const { getAccessTokenSilently } = useAuth0();
    const id = location.state;
    const [preview, setPreview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);

    const getImages = async()=>{
        const result = await axios.get(`/image/${id}`);
        setImages(result.data);

    }

    useEffect(()=>{
        getImages();
    }, [])
  
    const handleInputImg= (e)=>{
        const file= e.target.files[0]
        previewFile(file);
    }

    const previewFile=(file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend= ()=>{
            setPreview(reader.result)
        }
    }

    const uploadImage = async ()=>{
        try {
            setLoading(true);
            const token = await getAccessTokenSilently();
            const response = await axios.post(`/image/product/${id}`, { image: preview },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            setLoading(false);
            setPreview(false);

            getImages();
            if (response.status === 200) toast.success('Updated successfully');
            
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error('Something wrong');
        }
    }

    const deleteImage = async (public_id)=>{
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.delete(`/image/${public_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
            if (response.status === 200) toast.success('Delete successfully');
            getImages();
            
        } catch (error) {
            console.log(error);
            toast.error('Something wrong');
        }
    }

    return (
        <Transition>
        <div className="container">
            <h1 className="text-center py-2  text-danger">Upload product photos (ID:{id})</h1>
            <div className="d-flex" style={{gap: "5rem"}}>
            <div>

            <input onChange={handleInputImg} type="file" name="image" accept='image/*' id="image" style={{"display":"none"}}/>
            {loading
            ?<div style={{width: "20rem"}} className=""><Loading height={"250px"}/></div>
            :<img style={{width: "20rem"}} src={preview ||"https://removal.ai/wp-content/uploads/2021/02/no-img.png" } alt="photo" />
            }
            <br/>
            <label htmlFor="image" className='my-2 mx-1 btn btn-secondary'>Select Photo</label>
            <button disabled={!preview} type="submit" className="btn btn-success text-center" onClick={uploadImage} ><i className="me-2 fa-solid fa-floppy-disk"></i> Save</button>
            </div>
            <div>
                {images?.length>0
                ? images.map((img, idx)=><div key={idx} onClick={()=>deleteImage(img.public_id)} className="d-inline img-delete"><img className="m-1 img-thumbnail" style={{width:"10rem"}} src={img.image} alt="product"/></div>)
                :<></>
            }
            </div>
            </div>
        </div>
        </Transition>

    )
}