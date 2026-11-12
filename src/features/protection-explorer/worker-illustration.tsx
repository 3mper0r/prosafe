import styles from "./protection-explorer.module.css";

/** Original schematic placeholder; no products, ratings, or manufacturers are depicted. */
export function WorkerIllustration() {
  return (
    <svg
      viewBox="0 0 360 640"
      fill="none"
      className={styles.illustration}
      aria-hidden="true"
    >
      <path
        d="M180 22v596M36 160h288M36 320h288M36 480h288"
        stroke="#34393D"
        strokeWidth="0.6"
        strokeDasharray="3 7"
      />
      <g data-part="head" stroke="#777D82" strokeWidth="1.4">
        <path d="M148 78h64v34c0 23-11 36-32 36s-32-13-32-36Z" fill="#252A2D" />
        <path
          d="M140 80c0-29 15-48 40-48s40 19 40 48l10 9H130Z"
          fill="#FF5A1F"
        />
        <path d="M180 33v39M142 79h76" stroke="#101214" />
      </g>
      <g data-part="eyes" stroke="#A4A9AD" strokeWidth="1.7">
        <path
          d="m148 106 10-3h16l6 4 6-4h16l10 3-4 15h-19l-9-7-9 7h-19Z"
          fill="#101214"
        />
      </g>
      <g data-part="body" stroke="#777D82" strokeWidth="1.4">
        <path
          d="M162 144v20h36v-20M161 160l-38 13-22 36-16 91 25 8 18-67-5 139h114l-5-139 18 67 25-8-16-91-22-36-38-13-19 23Z"
          fill="#1B1E20"
        />
        <path d="M180 183v196M125 222h37v34h-35M197 222h37l2 34h-39M128 360h104M124 181l18 23 20-26M236 181l-18 23-20-26" />
        <path
          d="m126 202-11 18M234 202l11 18"
          stroke="#FF5A1F"
          strokeWidth="5"
        />
      </g>
      <g data-part="hands" stroke="#777D82" strokeWidth="1.4">
        <path
          d="m86 299-9 17-1 22 7 3 5-12 1 18 7 2 3-19 5 14 7-2-1-29-1-8Z"
          fill="#34393D"
        />
        <path
          d="m274 299 9 17 1 22-7 3-5-12-1 18-7 2-3-19-5 14-7-2 1-29 1-8Z"
          fill="#34393D"
        />
      </g>
      <g data-part="body" stroke="#777D82" strokeWidth="1.4">
        <path
          d="m123 380 3 82 13 96h29l12-139 12 139h29l13-96 3-82Z"
          fill="#1B1E20"
        />
        <path d="m139 455 27 2-2 31-23-1M195 457l26-2-2 32-22 1M140 536h29M191 536h29" />
      </g>
      <g data-part="feet" stroke="#777D82" strokeWidth="1.4">
        <path
          d="m139 550-7 20-14 14v16h51l4-16-5-34ZM192 550l-5 34 4 16h51v-16l-14-14-7-20Z"
          fill="#34393D"
        />
        <path d="M119 592h50M191 592h50M139 567h28M194 567h28" />
      </g>
      <path
        d="M64 612h232M36 36v28M22 50h28M324 576v28M310 590h28"
        stroke="#777D82"
        strokeWidth="0.8"
      />
    </svg>
  );
}
