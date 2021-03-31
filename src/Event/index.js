import React, {Component} from 'react';


class TestEvent extends Component {
    componentDidMount(){
        document.addEventListener('click', function(){
            console.log('document click')
        })
        document.getElementsByClassName('App')[0].addEventListener('click', function(){
            console.log('app click')
        })
        document.getElementsByTagName('button')[0].addEventListener('click', function(e){
            console.log('button click')
            // e.stopPropagation();
        })
    }
    onClick = (e) => {
        e.stopPropagation() // 能够阻止div.app的触发
        e.nativeEvent.stopImmediatePropagation(); // 能够阻止document的触发
        e.nativeEvent.stopPropagation(); // 什么都阻止不了
        console.log('react button click');
    };
    render() {
        return (
            <div className="fatherEl" onClick={() => {console.log('react app click')}}>
                <button onClick={this.onClick}>按钮</button>

                <ul>
                    {
                        Array(10)
                            .fill(1)
                            .map((it, idx) =>
                                <li
                                    key={idx}
                                    onClick={() => console.log(idx) }
                                    style={{padding: 20, border: '1px solid gray'}}
                                >{idx}</li>
                            )
                    }
                </ul>
                <p onClick={() => console.log('这是一个p 标签')}
                   style={{padding: 20, border: '1px solid gray'}}>
                    hello
                </p>
            </div>
        );
    }
}

export default TestEvent;
