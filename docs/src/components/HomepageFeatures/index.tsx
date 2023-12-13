import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Less Abstraction',
    description: (
      <>
        Horatio's main design goal is simplicity. The code base has to be less than
        10,000 lines. If we get above this limit we start to revert changes until we
        reach the goal again.
      </>
    ),
  },
  {
    title: 'Bring-Your-Own-Everything',
    description: (
      <>
        The server controller is bare-bones only and does not enforce any
        coding methodology. You can use whatever design pattern makes sense
        for you.
      </>
    ),
  },
  {
    title: 'Modern SSR',
    description: (
      <>
        ManiaLink pages are generated via MLX. A custom JSX runtime powered by Preact.
      </>
    ),
  },
  {
    title: 'Security',
    description: (
      <>
        Safe ManiaLink pages, command executions and authorization levels are guaranteed. On top of that the Deno
        runtime provides a granular permission system.
      </>
    ),
  },
  {
    title: 'Docker Support',
    description: (
      <>
        No complicated installation steps needed. Just run "docker compose up -d" after creating the .env file.
      </>
    ),
  },
  {
    title: 'Documentation',
    description: (
      <>
        Every single detail will be documented. It is important for Horatio to be
        useful for educational purposes.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      {Svg && (
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
      )}
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
