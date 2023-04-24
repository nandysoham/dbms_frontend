import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [profileinfo, setprofileinfo] = useState({
    picture: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
  });
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      var profilepic = "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
      if (localStorage.getItem("picture")) {
        profilepic = process.env.REACT_APP_CLOUDINARY_URL + localStorage.getItem("picture") + ".png"
      }
      console.log(profilepic)
      setprofileinfo({
        authtoken: localStorage.getItem("authtoken"),
        firstname: localStorage.getItem("firstname"),
        user: localStorage.getItem("user"),
        picture: profilepic
      })
    }

    console.log(setprofileinfo)
  }, []
  )

  const signout = () => {
    console.log("here in signout")
    localStorage.removeItem("authtoken")
    localStorage.removeItem("user")
    localStorage.removeItem("picture")
    setprofileinfo({})
  }
  return (
    <div>
      {/* <!-- Navbar --> */}
      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        {/* <!-- Container wrapper --> */}
        <div class="container-fluid">
          {/* <!-- Toggle button --> */}
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          {/* <!-- Collapsible wrapper --> */}
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Navbar brand --> */}
            <a class="navbar-brand mt-2 mt-lg-0" href="/">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="15"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>
            {/* <!-- Left links --> */}
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Team
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/">
                  Projects
                </a>
              </li>
            </ul>
            {/* <!-- Left links --> */}
          </div>
          {/* <!-- Collapsible wrapper --> */}
          <form class="form-inline my-lg-0" style={{display:"flex", alignItems:"center"}}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0 mx-2" type="submit">Search</button>
            </form>
            
            <a class="link-secondary mx-3" href="/cart">
              <i class="fas fa-shopping-cart"></i>
            </a>
          {/* <!-- Right elements --> */}
          <div class="d-flex align-items-center">
            {/* <!-- Icon --> */}
            

            {/* <!-- Avatar --> */}
            {profileinfo.authtoken ? (
              <>
                <div className="mx-3">Hi {profileinfo.firstname} </div>
                <div class="dropdown">
                  <a
                    class="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="/"
                    id="navbarDropdownMenuAvatar"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={profileinfo.picture}
                      class="rounded-circle"
                      height="35"
                      width="35"
                      alt="Black and White Portrait of a Man"

                    />
                  </a>
                  <ul
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuAvatar"
                  >
                    <li>
                      {
                        profileinfo.user == "customer" ?
                          <a class="dropdown-item" href="/customer/orders" >
                            User Dashboard
                          </a>

                          :
                          <a class="dropdown-item" >
                            <a class="dropdown-item" href="/seller/orders" >
                              Seller Dashboard
                            </a>
                          </a>
                      }

                    </li>
                    <li>
                      <a class="dropdown-item" href="/">
                        Settings
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={signout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>

                <a href="/customer/login ">
                  <button type="button" class="mx-2 btn btn-primary btn-rounded">
                    Login
                  </button>
                </a>


                or
                <a href="/customer/signup ">
                  <button
                    type="button"
                    class="mx-2 btn btn-secondary btn-rounded"
                  >
                    Signup{" "}
                  </button>
                </a>
              </>
            )}
          </div>
          {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
      </nav>
      {/* <!-- Navbar --> */}
    </div>
  );
};

export default Navbar;


// https://res.cloudinary.com/daqjfe5sx/image/upload/Nordic_stores/NDj3jzPqr-profilepic.jpeg.png