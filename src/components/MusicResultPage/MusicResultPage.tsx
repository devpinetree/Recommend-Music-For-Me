interface MusicResultPageProps {
  title: string;
  artist: string;
  img: string;
}

const MusicResultPage = (props: MusicResultPageProps) => {
  const { title, artist, img } = props;

  return (
    <div>
      <img className="Thumbnail" src={img} alt="Thumbnail" />
      {title} {artist}
    </div>
  );
};

export default MusicResultPage;
