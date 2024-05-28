<template>
  <div class="page-content">
    <h1></h1>
    <div class="content">
      <div class="rows">
        <div class="row1">
          <div class="testimony">
            <div class="user-info">
              <div class="profile-pic">
                <img src="../assets/images/BM-Prime-Capital-apporter-un-nouveau-souffle-aux-start-up-africaines.jpg" alt="" />
              </div>
              <!-- <div class="info">
                <p>Elikplim Namga</p>
                <p>AAcademy,President</p>
              </div> -->
            </div>
            <!-- <div class="message">
              <p>
                Maxim Nyansa's Exam Portal <br />
                revolutionized our examinations, ensuring a seamless, secure, and efficient
                experience for our students.
              </p>
            </div> -->
          </div>
          <div class="testimony">
            <div class="user-info">
              <div class="profile-pic">
                <img src="../assets/images/Screenshot from 2024-05-22 16-42-31.png" alt="" />
              </div>
              <!-- <div class="info">
                <p>Kudzo Namga</p>
                <p>Assess Institution,Student</p>
              </div> -->
            </div>
            <!-- <div class="message">
              <p>
                Maxim Nyansa's Exam Portal has transformed the way we conduct examinations,
                providing students with a smooth, secure, and streamlined experience.
              </p>
            </div> -->
          </div>
        </div>

        
        <div class="row2">
          <div class="testimony">
            <div class="user-info">
              <div class="profile-pic">
                <img src="../assets/images/images (1).jpeg" alt="" />
              </div>
              <!-- <div class="info">
                <p>Effa Nana</p>
                <p>Kingdom International,Teacher</p>
              </div> -->
            </div>
            <!-- <div class="message">
              <p>
                Maxim Nyansa's Exam Portal transformed our approach to examinations, creating a
                smooth, secure, and effective environment for our students.
              </p>
            </div> -->
          </div>
          <div class="testimony">
            <div class="user-info">
              <div class="profile-pic">
                <img src="../assets/images/1697455160615.jpeg" alt="" />
              </div>
              <!-- <div class="info">
                <p>Elikplim Namga</p>
                <p>AAcademy,President</p>
              </div> -->
            </div>
            <!-- <div class="message">
              <p>
                Maxim Nyansa's Exam Portal <br />
                revolutionized our examinations, ensuring a seamless, secure, and efficient
                experience for our students.
              </p>
            </div> -->
          </div>
        </div>
      </div>

      
      <div class="video">
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/VIDEO_ID"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
    </iframe>
</div>


      
    </div>
  </div>
</template>

<script>

export default {}
</script>

<style lang="css" scoped>
.page-content {
  /* background-image: url('@/assets/images/1564405116472.jpeg'); */
  background-color: rgb(136, 128, 128);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  padding-top: 3em;
  padding-block: 3em;
  height: 70%;
}
h1 {
  padding-bottom: 2rem;
  font-size: 3rem;
}
.content {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.rows {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.row1,
.row2 {
  display: flex;
  gap: 1rem;
}
.testimony {
  width: 20em;
  height: 15em;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  
  padding: 2rem 0.75rem;
  gap: 1.5rem;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.profile-pic img {
  width: 20.938rem;
  height: 15.125rem;
  transition: transform 0.3s ease;
}
.profile-pic img:hover {
  transform: scale(1.9); /* Zoom de 20% lorsque le curseur est placé sur l'image */
}

.user-info p {
  font-weight: bold;
}
.message {
  line-height: 1.5rem;
}
.video {
  padding-top: 12%;
  background-color: #07224b;
}

@media only screen and (max-width: 600px) {
  .page-content {
    display: none;
  }
}
</style>
