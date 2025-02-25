import "./NewsDetailPage.css";
import YerevanImg from "../images/YerevanSunset.jpg";

function NewsPageFirst() {
  return (
    <div className="newsDetailPage">
      <h1 className="newsDetailTitle">Yerevan Golden Hour Times</h1>

      <img src={YerevanImg} alt="News Detail" className="newsDetailImage" />

      <div className="newsDetailContent">
        <p>
          Time is of the essence for photographers to take breathtaking photos.
          Quite possibly the most coveted time to take photos is during the
          golden hour, just before the sun sets, and the sun produces a soft,
          warm light that brings out the best in any landscape. This golden hour
          in Yerevan allows one to take beautiful photos of the city's
          architecture, landscape, and bustling street life. At the moment,
          sunset in Yerevan is at around 6:30 PM, so 6:00 PM is the ideal time
          for photographers to find their spots for their golden hour shots.
          This gives the best natural light, rendering the photos not only
          visually appealing but also full of warmth and depth. In order to make
          use of the golden hour, here are some tips for shooting great
          photographs: Plan Your Location: Scout ahead of time. Search for a
          place where the light will be on your subject just right during the
          golden hour. Whether a scenic overlook of the Cascade or a charming
          street in the city center, knowing your location ahead of time can
          save time. Play with Angles: Golden hour light is changing extremely
          quickly. Play with various angles to notice the way the light falls on
          your subject. You can discover that a small shift can produce
          radically different results. Use Reflectors: When you are shooting
          people, experiment with using a reflector to bounce light onto your
          subject. You can use this technique to illuminate facial details and
          make your portrait photos bright and full of life. Golden hour is also
          a great time to shoot movement shots, e.g., of people walking in the
          city. The warm light gives movement shots a touch of magic, and they
          seem to come alive. Keep in mind, the golden hour does not last long,
          so prepare your camera to take a shot at the precise moment. By
          planning and creativity, you can capture Yerevan in a manner that
          reflects not only its beauty but also your personal style of
          photography.
        </p>
      </div>
    </div>
  );
}

export default NewsPageFirst;
