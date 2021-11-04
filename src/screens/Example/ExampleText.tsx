import React from 'react';
import {Text, Block} from '@components/base';

const ExampleText = () => {
  return (
    <Block backgroundColor="white" flex padding={16}>
      <Text size={16} fontType="bold" margin={{bottom: 4}}>
        Example paragraph:{' '}
      </Text>
      <Text>
        いまはもうこの種のちょうは絶えてしまっている。
        いまだかつて偉大なもので熱烈な精神なくして成し遂げられたものは何もない。
        「ｐｒｅｔｔｙ」の綴りは？ 肩慣らしには丁度いいかも。
        いやあ、見事に晴れ渡った秋の日になったね。これが台風一過というやつかね。
        インフレを抑制しようとして金融政策に偏重すると、金融、したがって景気を必要以上に締め付けることになりかねない。
        あなたは船で旅行をしますか、飛行機でしますか。
        イベントが成功したのは貴殿のたゆみ無い努力と献身のおかげです
      </Text>
    </Block>
  );
};

export default ExampleText;
