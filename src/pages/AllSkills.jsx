import { useEffect, useState } from "react"

export default function AllSkills() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [skills, setSkills] = useState()

    const fetchData = async()=>{
        try {
            let url = 'http://localhost:5005/skill'
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

  return (
    <>
        <div>
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

        <div>
            {!skills ? 
                <p>Loading...</p>
            : skills.length===0?
            <p>No skills to show</p>
            :
            skills.map((eachSkill)=>(
                <div key={eachSkill._id}>
                    <p>{eachSkill.title}</p>
                </div>
               
            ))
            }
            
        </div>
        
    </>
    
  )
}
