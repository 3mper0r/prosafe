import Image from "next/image";
import workerPortrait from "../../../public/images/prosafe-hero-worker.png";
import styles from "./hero.module.css";

export function WorkerPortrait({ alt }: { alt: string }) {
  // Account for the landscape source rendering up to 2.5x wider in a cover crop.
  return (
    <figure className={styles.worker}>
      <Image
        src={workerPortrait}
        alt={alt}
        fill
        preload
        sizes="(max-width: 767px) 110vw, (max-width: 1099px) 100vw, 73vw"
        className={styles.workerImage}
      />
    </figure>
  );
}
