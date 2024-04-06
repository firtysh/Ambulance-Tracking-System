import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { signupAmbulance, signupHospital, signupUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  AddressAutofill,
  AddressMinimap,
  SearchBox,
} from "@mapbox/search-js-react";
const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const [type, setType] = useState("us");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      if (type === "us") {
        const res = await signupUser(data);
        console.log(res);
        setUser(res);
        setToken(res.token);
        navigate("/home");
      } else if (type === "ha") {
        const res = await signupHospital({ ...data, location });
        console.log(res);
        setUser(res);
        setToken(res.token);
        navigate("/home");
      } else if (type === "ad") {
        const res = await signupAmbulance(data);
        console.log(res);
        setUser(res);
        setToken(res.token);
        navigate("/home");
      }
    } catch (err) {
      window.alert("An error occured");
      console.log(err);
      setLoading(false);
    }
  };
  const handleFormChange = (e) => {
    setType(e.target.value);
    reset();
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [type]);
  return (
    <div className="mx-auto mt-10 max-w-screen-md">
      <h1 className="font-bold text-2xl text-center underline underline-offset-2">
        Sign Up
      </h1>
      <form
        className="gap-2 form-control mx-auto w-full max-w-xs"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="label">
          <span className="label-text">Sign Up as</span>
        </div>
        <select
          className="select-bordered select"
          value={type}
          onChange={handleFormChange}
        >
          <option value={"us"}>User</option>
          <option value={"ha"}>Hospital Authority</option>
          <option value={"ad"}>Ambulance Driver</option>
        </select>
        {type !== "ad" ? (
          <>
            <div className="label">
              <span className="label-text">
                {type === "us" ? "What is your name?" : "Name of the hospital?"}
              </span>
            </div>
            <input
              type="text"
              className="input-bordered w-full max-w-xs input"
              {...register("name", { required: true })}
            />
          </>
        ) : (
          <>
            <div className="label">
              <span className="label-text">Name of the driver</span>
            </div>
            <input
              type="text"
              className="input-bordered w-full max-w-xs input"
              {...register("driverName", { required: true })}
            />
          </>
        )}
        <div className="label">
          <span className="label-text">Email : </span>
        </div>
        <input
          type="email"
          className="input-bordered w-full max-w-xs input"
          {...register("email", { required: true })}
        />
        {type === "ha" && (
          <>
            <div className="label">
              <span className="label-text">Hospital Type : </span>
            </div>
            <select
              className="select-bordered select"
              required
              {...register("hospitalType")}
              defaultValue={"public"}
            >
              <option value={"government"}>Government</option>
              <option value={"private"}>Private</option>
            </select>
          </>
        )}
        {type === "ad" && (
          <>
            <div className="label">
              <span className="label-text">Ambulance Type : </span>
            </div>
            <select
              className="select-bordered select"
              required
              {...register("ambulanceType")}
            >
              <option value="bls">Basic Life Support Ambulance</option>
              <option value="als">Advance Life Support Ambulance</option>
              <option value="micu">Mobile Intensive Care Unit Ambulance</option>
              <option value="air">Air Ambulance</option>
              <option value="boat">Boat Ambulance</option>
              <option value="mortuary">Mortuary Ambulance</option>
            </select>
            <div className="label">
              <span className="label-text">Number Plate : </span>
            </div>
            <input
              type="text"
              className="input-bordered w-full max-w-xs input"
              {...register("numberPlate", { required: true })}
            />
          </>
        )}
        <div className="label">
          <span className="label-text">Contact Number : </span>
        </div>
        <input
          type="number"
          className="input-bordered w-full max-w-xs input"
          {...register("phone", { required: true })}
        />
        <div className="label">
          <span className="label-text">Password : </span>
        </div>
        <input
          type="password"
          className="input-bordered w-full max-w-xs input"
          {...register("password", { required: true })}
        />
        {type === "ha" && (
          <>
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <SearchBox
              accessToken="pk.eyJ1IjoicmFraGktMTQiLCJhIjoiY2xycDVnOWpyMDIydDJqbGlhM3h1a3VnYyJ9.-iZoVxx_umdTFq9lxVcAdA"
              options={{
                country: "IN",
              }}
              onChange={(e) => {
                console.log(e);
              }}
              onRetrieve={(res) => {
                console.log(res);
              }}
            ></SearchBox>
            {/* <AddressMinimap className="w-1/2 h-24" accessToken='pk.eyJ1IjoicmFraGktMTQiLCJhIjoiY2xycDVnOWpyMDIydDJqbGlhM3h1a3VnYyJ9.-iZoVxx_umdTFq9lxVcAdA'
          keepMarkerCentered={true}
          show={true}
          feature={[0,0]}
          >

          </AddressMinimap> */}
            <div>
              <input
                type="number"
                placeholder="Latitude"
                className="input-bordered w-full max-w-xs input"
                value={location.lat}
                {...register("latitude", { required: true })}
              />
              <input
                type="number"
                placeholder="Longitude"
                className="input-bordered w-full max-w-xs input"
                value={location.lng}
                {...register("longitude", { required: true })}
              />
            </div>
          </>
        )}
        <button className="btn" type="submit" disabled={loading}>
          {loading && <span className="loading loading-spinner"></span>}Sign Up
        </button>
        <span>
          Already Have an account?{" "}
          <Link to={"/signin"} className="text-blue-600 underline">
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
