/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"


export const ContextProvider = createContext();


const fakeData = [
    {
      "id": 1,
      "title": "Fire Outbreak in Gizosi",
      "category": "fire",
      "createAt": "2020-12-29",
      "level": "medium",
      "description": "Large fire reported in a residential building.Multiple units affected.Immediate assistance required.",
      "location": "Gisozi, Ruhango Market",
      "time": "1:45pm",
      "responders": [
        { "name": "Winny", "type": "En route to the scene" },
        { "name": "Mustafa", "type": "At the scene" },
        { "name": "Musa", "type": "At the scene" }
      ],
      "status": "finished",
      "type": "active",
      "creator": "Willam Thomas",
      "images": []
    },
    {
      "id": 2,
      "title": "Electric Wire Fault, Simba ...",
      "category": "Electric",
      "createAt": "2022-11-29",
      "level": "medium",
      "description": "Large fire reported in a residential building.Multiple units affected.Immediate assistance required.",
      "location": "Gisozi, Ruhango Market",
      "time": "1:45pm",
      "responders": [
        { "name": "Winny", "type": "En route to the scene" },
        { "name": "Mustafa", "type": "At the scene" },
        { "name": "Musa", "type": "At the scene" }
      ],
      "status": "finished",
      "type": "inactive",
      "creator": "Willam Thomas",
      "images": []
    },
    {
      "id": 3,
      "title": "Woman in Labour, Kaciciru",
      "category": "fire",
      "createAt": "2020-12-29",
      "level": "medium",
      "description": "Large fire reported in a residential building.Multiple units affected.Immediate assistance required.",
      "location": "Gisozi, Ruhango Market",
      "time": "1:45pm",
      "responders": [
        { "name": "Winny", "type": "En route to the scene" },
        { "name": "Mustafa", "type": "At the scene" },
        { "name": "Musa", "type": "At the scene" }
      ],
      "status": "finished",
      "type": "active",
      "creator": "Willam Thomas",
      "images": []
    }
  ]
  
const ContextApi = ({children}) => {
    const [data,setData] = useState(fakeData)
  return (
    <ContextProvider.Provider value={{
        data
    }}>{children}</ContextProvider.Provider>
  )
}

export default ContextApi