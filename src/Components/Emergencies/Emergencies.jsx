import { useContext, useState } from "react";
import "./Emergencies.css";
import Emergence from "../Emergence/Emergence";
import Details from "../Details/Details";
import { ContextProvider } from "../../context/ContextApi";

const Emergencies = () => {
  const [active, setActive] = useState(true);
  const [details, setDetails] = useState(null);
  const { data } = useContext(ContextProvider);

  return details ? (
    <Details data={details} setDetails={setDetails} />
  ) : (
    <section className="emergencies">
      <h1 className="title">Emergencies</h1>
      <div className="content">
        <div className="top_nav">
          <h4
            onClick={() => setActive(true)}
            style={
              active
                ? {
                    borderBottom: "2px solid #333333",
                  }
                : {
                    borderBottom: "2px solid transparent",
                  }
            }
          >
            Active
          </h4>
          <h4
            onClick={() => setActive(false)}
            style={
              !active
                ? {
                    borderBottom: "2px solid #333333",
                  }
                : {
                    borderBottom: "2px solid transparent",
                  }
            }
          >
            InActive
          </h4>
        </div>

        <div className="box">
          {data &&
            data.map((ele) => {
              if (active) {
                if (ele.status === "active") {
                  return (
                    <Emergence
                      key={ele.id}
                      data={ele}
                      status={ele.type}
                      setDetails={() => setDetails(ele)}
                    />
                  );
                }
              } else {
                if (ele.status !== "active") {
                  return (
                    <Emergence
                      key={ele.id}
                      data={ele}
                      status={ele.type}
                      setDetails={() => setDetails(ele)}
                    />
                  );
                }
              }
            })}
        </div>
      </div>
    </section>
  );
};

export default Emergencies;
