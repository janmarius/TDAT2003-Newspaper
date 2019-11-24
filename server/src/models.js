import Sequelize from 'sequelize';
import type { Model } from 'sequelize';
import sequelize from "./db";
require('dotenv').config();


export let Article: Class<
  Model<{ id?: number, title: string, body: string, image: string, important: boolean, category?: string }>
> = sequelize.define(
  'Article',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
    image: Sequelize.TEXT,
    important: Sequelize.BOOLEAN
  },
  {
    freezeTableName: true
  }
);

export let Category: Class<Model<{ category: string, priority: number }>> = sequelize.define(
  'Category',
  {
    category: { type: Sequelize.STRING, primaryKey: true },
    priority: Sequelize.INTEGER
  },
  {
    timestamps: false,
    freezeTableName: true
  }
);

Category.hasMany(Article, { foreignKey: { name: 'category', allowNull: false } });

export let Comment: Class<
  Model<{ id?: number, article_id?: number, nickname: string, comment: string }>
> = sequelize.define(
  'Comment',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: Sequelize.STRING,
    comment: Sequelize.TEXT
  },
  {
    freezeTableName: true
  }
);

Article.hasMany(Comment, { foreignKey: { name: 'article_id', allowNull: false } });

// Drop tables and create test data when not in production environment
let production = process.env.NODE_ENV === 'production';
// The sync promise can be used to wait for the database to be ready (for instance in your tests)
export let sync = sequelize.sync({ force: production ? false : true }).then(() => {
  if (!production)
    return Category.create({
      category: 'News',
      priority: 1
    })
      .then(category => {
        category
          // $FlowFixMe
          .createArticle({
            title: 'The war is almost over...',
            body:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
              '\n' +
              'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
              '\n' +
              'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
              '\n' +
              'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
              '\n' +
              'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
              '\n' +
              'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
            image:
              'https://images.unsplash.com/photo-1494972688394-4cc796f9e4c5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5966fbd4a3212dc13c7ad81c4d665354&auto=format&fit=crop&w=1350&q=80',
            important: true
          })
          .then(article => {
            article.createComment({
              nickname: 'anonym88',
              comment: 'Freedom...'
            });
          });
        // $FlowFixMe
        category.createArticle({
          title: 'Nations in ruins',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1419848449479-6c8a7d8d62c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8d57d2a8902bf44864c7cbb7df2fafac&auto=format&fit=crop&w=1350&q=80',
          important: false
        });
        // $FlowFixMe
        category.createArticle({
          title: 'Full list of stores closing in 2018',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0ef06f88dab75b74252e22465ad9c99d&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        // $FlowFixMe
        category.createArticle({
          title: 'Who will be the next president',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1520525003249-2b9cdda513bc?ixlib=rb-0.3.5&s=e157bd2de45973d0a1ae09881af42552&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        // $FlowFixMe
        category.createArticle({
          title: 'Latest News on BitCoin',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=20505ab3ec40e93846c7f4340f92ab99&auto=format&fit=crop&w=1349&q=80',
          important: false
        });
        category
          // $FlowFixMe
          .createArticle({
            title: "Strike throughout the country's supermarket",
            body:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
              '\n' +
              'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
              '\n' +
              'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
              '\n' +
              'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
              '\n' +
              'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
              '\n' +
              'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
            image:
              'https://images.unsplash.com/photo-1525328437458-0c4d4db7cab4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a1a2b9825494963cba280fc043671b65&auto=format&fit=crop&w=1350&q=80',
            important: true
          })
          .then(article => {
            article.createComment({
              nickname: 'Nillzz114',
              comment: 'Nice stuff!'
            });
          });
        // $FlowFixMe
        category.createArticle({
          title: 'Hurricane Florence',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1457327289196-f38b88d97147?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjExMzk2fQ&s=64f1f220ddebc6ce98f7fbe3b3b267dc&auto=format&fit=crop&w=1352&q=80',
          frontPage: true
        });
        // $FlowFixMe
        category.createArticle({
          title: 'England celebrates',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1518297685135-c6d5cc247d13?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=031e4ea7eb45afd61c84f4c8236112c9&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
      })
      .then(() =>
        // $FlowFixMe
        Category.create({
          category: 'Sport',
          priority: 2
        })
      )
      .then(category => {
        category.createArticle({
          title: 'Full stadium during todays match',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=10794df94c2543bee8f590b3681452c7&auto=format&fit=crop&w=1350&q=80',
          important: false
        });
        category.createArticle({
          title: 'Surfing World Championship 2019',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e259bc9483e8f8938b0245f96826c969&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Crossfit in Norway next year?',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1434596922112-19c563067271?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e0f576d343645015367510d3829a582e&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Wimbledon 2018 - all you need to know',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1530915534664-4ac6423816b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6a277611932a58472ddd54bbc8201047&auto=format&fit=crop&w=1350&q=80',
          important: false
        });
        category.createArticle({
          title: 'Magnus Carlsen weathers early Fabuano Caruana surprise in Game 5 draw – as it happened',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8cf14450e7ab6e30d85800342f9ed485&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: "Today's baseball game",
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d07e497e8f90af29b9c3da6a02dfa4ea&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Best archers in the world...',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1513907450027-b9926e160c2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=825b2571e6253b4336f0fba4604e6443&auto=format&fit=crop&w=1349&q=80',
          important: true
        });
      })
      .then(() =>
        // $FlowFixMe
        Category.create({
          category: 'Culture',
          priority: 3
        })
      )
      .then(category => {
        category.createArticle({
          title: 'Brilliant movie',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1528837715997-43c4adb12aa8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d552b5c6ccc06838eeaa5e8325f7408d&auto=format&fit=crop&w=1350&q=80',
          important: false
        });
        category.createArticle({
          title: 'Something about Culture',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1523751126961-4365990f768b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eb4a3d03ae07a11ec953b81de8da6daf&auto=format&fit=crop&w=1347&q=80',
          important: true
        });
        category.createArticle({
          title: 'Cool culture content',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1505932794465-147d1f1b2c97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=330f47db0730dfb2f0017d3b5eb1417d&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'street art',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1501569420805-e4dd535ec970?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=995f02c0c5a36bcfe19d10f222c77060&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'More stuff about culture...',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1535510644066-fd447e3c7781?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7b0730eeb09e5aed977e8d3a833504e7&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Last thing about culture...',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1533903237682-b47efb7ebffd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=096378b666c2f4ca19c2e488745f1da1&auto=format&fit=crop&w=1402&q=80',
          important: false
        });
        category.createArticle({
          title: 'Something about Culture',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1515900959941-d1cce424f5c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c9c593bad87f0e4db0fdb8fcb965a90&auto=format&fit=crop&w=1351&q=80',
          important: true
        });
      })
      .then(() =>
        // $FlowFixMe
        Category.create({
          category: 'Tech',
          priority: 4
        })
      )
      .then(category => {
        category.createArticle({
          title: 'New motherboard coming out',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1516865622081-e98d705bb920?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e453c06501d9fb07a1d9e4d598410be&auto=format&fit=crop&w=1350&q=80',
          important: false
        });
        category.createArticle({
          title: 'Everything you need to know about software development',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=575755492ef51726cb066f422908b9d7&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'AI taking over the world',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=139f00301feb37e712adda8bf9d8b91f&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Super hot tech coming earlie 2020',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1512161537930-40e70617f1f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e24e3af165bab3083975566cfb85be9&auto=format&fit=crop&w=1350&q=80',
          important: false
        });
        category.createArticle({
          title: "WoW, the one HDD faster then all SDD's on the market",
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1484662020986-75935d2ebc66?ixlib=rb-0.3.5&s=9bb240e2908fd74dbafd43c9a93b26b8&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Silent cooling for gaming',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1513366884929-f0b3bedfb653?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b111fd6819e93137251f2eefe1cf8b9c&auto=format&fit=crop&w=1350&q=80',
          important: true
        });
        category.createArticle({
          title: 'Best drones for photography 2018',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1488263590619-bc1fff43b6c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c47433ac0414b561157e79989b4633ce&auto=format&fit=crop&w=1267&q=80',
          important: true
        });
        category.createArticle({
          title: 'Supert camera...',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lorem eros, accumsan non ligula nec, varius porttitor mauris. Aenean lorem turpis, faucibus non semper vestibulum, fringilla vel leo. Vestibulum molestie nibh vitae nibh luctus, a pharetra libero finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean libero quam, volutpat quis egestas eu, cursus facilisis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent ac vulputate enim. Nam ultricies rutrum odio.\n' +
            '\n' +
            'Praesent vitae diam diam. Maecenas pharetra nibh a risus feugiat tristique. In sodales vel tellus sit amet convallis. Donec sit amet egestas felis, vitae consequat diam. Suspendisse aliquet facilisis tincidunt. Aliquam gravida quis eros vel ultrices. Duis ornare, dolor auctor lacinia imperdiet, magna massa vestibulum orci, sit amet malesuada dolor urna vel purus. Pellentesque quis mauris orci. Suspendisse pretium rhoncus metus, quis accumsan augue sodales eget.\n' +
            '\n' +
            'Duis mauris lorem, dictum id elementum sed, gravida vel felis. Sed vehicula arcu nunc, id fermentum ligula auctor eu. Nulla ac arcu blandit, eleifend dui quis, placerat ante. Aliquam eget orci mattis, sagittis justo quis, auctor mauris. Cras ligula nisl, commodo vitae tincidunt ut, cursus id nisl. Maecenas ut lobortis dolor. Aenean nisl diam, porta eu lacinia et, maximus malesuada dolor. Suspendisse lorem lorem, consectetur at efficitur ac, auctor non mauris. Praesent viverra ante vestibulum mi mollis, id laoreet ante porttitor. Curabitur vel quam quis dolor posuere egestas. Suspendisse in erat ut elit commodo egestas. Mauris vehicula ligula efficitur dui sagittis placerat. Cras non elit sit amet erat ultricies lobortis quis ullamcorper tortor.\n' +
            '\n' +
            'Nulla ex eros, interdum eget sapien ac, placerat malesuada metus. Integer feugiat odio est, sed placerat lacus semper bibendum. Mauris dignissim pretium varius. Suspendisse potenti. Integer nisl felis, sodales eget ullamcorper vehicula, iaculis eget nunc. Donec a rutrum ipsum. Nam non felis vitae dolor mattis mollis. Sed eu est in lectus tempus elementum ac eget augue. Nulla auctor mi lorem, sagittis commodo purus pretium non. Integer non urna vitae arcu mattis cursus sit amet vel urna. Praesent id cursus mi. Mauris ac purus at est auctor iaculis.\n' +
            '\n' +
            'Vivamus vitae elit porttitor, accumsan ex accumsan, auctor libero. Vivamus feugiat tristique metus at lacinia. In eu massa vehicula, mollis mauris et, hendrerit augue. Aenean metus tortor, aliquet quis augue a, efficitur sodales turpis. Sed varius, magna eget congue finibus, lectus massa semper elit, ac congue magna quam quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et bibendum justo. Morbi eu erat nec ex consequat aliquam. Ut condimentum ante nec dolor cursus, euismod ultricies diam hendrerit. Etiam cursus neque ut sapien luctus aliquet. Nullam at sodales velit. Morbi lobortis ultrices sapien, quis vulputate leo faucibus at.\n' +
            '\n' +
            'Praesent id ipsum ut tortor aliquam sodales. Cras sodales convallis ex rhoncus commodo. Donec ornare ante a odio suscipit dapibus. Phasellus id nulla interdum leo vehicula interdum in vitae lectus. Suspendisse a nisi augue. Maecenas sollicitudin vitae elit sit amet pulvinar. Duis elementum urna nec massa egestas scelerisque. Vivamus at orci in dolor faucibus consequat. Phasellus ac interdum turpis. Integer nec egestas nibh. Mauris et dui tempor, cursus enim finibus, volutpat dolor. Donec ante eros, eleifend in diam sed, pellentesque accumsan nunc.',
          image:
            'https://images.unsplash.com/photo-1510282271343-fdc3dea55439?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bec0bf06a6a09fe9d55c2d2eaad97979&auto=format&fit=crop&w=1592&q=80',
          important: true
        });
      });
});
