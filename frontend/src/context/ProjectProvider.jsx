import { useState, useEffect, createContext } from "react";

const ProjectContext = createContext()

const ProjectProvider = ({ children }) => {

    return (
        <ProjectContext.Provider value={{}}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext