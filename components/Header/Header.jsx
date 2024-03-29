import React, { useState } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faPlane,
  faCar,
  faBed,
  faTaxi,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { createLogger } from "vite";

const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleClick = (name, opr) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]:( opr === "pos" ? options[name] + 1 : options[name] - 1)
      };
    });
  };

  const navigate=useNavigate();
  const handleSearch=()=>{
    navigate("/hotels",{state:{destination,date,options}})
  }
  return (
    <div className="header">
      <div className={type==="list"?"headerContainer listMode":"headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faHotel} />
            <span>Stays</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type!=="list"&&
          <>
          <h1 className="headerTitle">A lifetime of dicounts? It's Genius.</h1>
          <p className="headerDesc">
            Get rewarded for your travels - unlock instant savings of 10% or more
            with a free BookMe account
          </p>
          <button className="headerBtn">Sign in / Register</button>
          <div className="headerSearch">
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faBed} className="headerIcon" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="headerSearchInput"
                onChange={(e)=>
                  setDestination(e.target.value)}
              />
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                date[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="date"
                />
              )}
            </div>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faPerson} className="headerIcon" />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
              >
                {`${options.adult} adult . ${options.children} children .  ${options.room} room`}
              </span>
              {openOptions&&
              <div className="options">
                <div className="optionsItem">
                  <span className="optionText">Adult</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      onClick={() => handleClick("adult", "neg")}
                      disabled={options.adult<=1}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleClick("adult", "pos")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionsItem">
                  <span className="optionText">Children</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      onClick={() => handleClick("children", "neg")}
                      disabled={options.children<=0}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleClick("children", "pos")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="optionsItem">
                  <span className="optionText">Room</span>
                  <div className="optionCounter">
                    <button
                      className="optionCounterButton"
                      onClick={() => handleClick("room", "neg")}
                      disabled={options.room<=1}
                    >
                      -
                    </button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button
                      className="optionCounterButton"
                      onClick={() => handleClick("room", "pos")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              }
            </div>
            <div className="headerSearchItem">
              <button className="headerBtn" onClick={()=>handleSearch}>Search</button>
            </div>
          </div>
        </>
        }
      </div>
    </div>
  );
};

export default Header;
