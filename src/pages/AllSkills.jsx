import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function AllSkills() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [skills, setSkills] = useState()

    const fetchData = async()=>{
        try {
            let url = `${import.meta.env.VITE_BASE_API_URL}/skill`
            if(selectedCategory !== 'All'){
                url += `?category=${selectedCategory}`
            }
            console.log(url)
            const response = await fetch(url)
            if (response.status===200){
                const parsed = await response.json()
                setSkills(parsed)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    }, [selectedCategory])

    useEffect(()=>{
        console.log(skills)
    },[skills])

  return (
    <>
        {/* <Link to={'/allevents'} >Discover all the events</Link> */}
        <div className="dropDownMenu">
            <label>Category</label>
            <select onChange={(event)=>(setSelectedCategory(event.target.value))}>
                <option value='All'>All categories</option>
                <option>Music</option>
                <option>Photography</option>
                <option>Coding</option>
                <option>Cooking</option>
                <option>Gardening</option>
                <option>Beauty</option>
                <option>Domestic-Skills</option>
                <option>Languages</option>
                <option>Other</option>
            </select>
        </div>

        <div className="grid">
            {!skills ? 
                <p>Loading...</p>
            : skills.length===0?
            <p>No skills to show</p>
            :
            skills.map((eachSkill)=>(
                <div className="container">
                <Link to={`/skilldets/${eachSkill._id}`} key={eachSkill._id}>
                    <p>{eachSkill.title}</p>
                </Link>
                </div>
            ))
            }
            
        </div>
        
    </>
    
  )
}