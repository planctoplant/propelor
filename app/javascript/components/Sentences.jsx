import { Table, Tag, message, Popconfirm } from "antd";
import React from "react";
import AddSentenceModal from "./AddEntryModal";
// import { Table, Tag, Space } from 'antd';
import _ from "lodash";


class Sentences extends React.Component {

	columns = [
		{
			title: "Content",
			dataIndex: "content",
			key: "content",

			render(_text, record) {
	      		return (
	      			<span>
			      	{record.contentTagged.map((word, wordIndex) => {
			      		let tagKey = 'sentence-'+record.id
			      		if (_.isObject(word)) {
			      			const colors = ["lightBlue", "darkCyan", "coral	", "darkSeaGreen", "deepPink", "gold"];
			      			const randomColor = colors[Math.floor(Math.random() * colors.length)];

			      			let color = word.color || randomColor;

							tagKey += '-entity-' + word.id;
							return (
								<Tag color={color} key={tagKey}>
								  {word.text} {word.ktype.toUpperCase()}
								</Tag>
							);
			      		} else {
			      			tagKey += '-' + wordIndex;

			      			if (word[0] == ' ')
			      				word = word.substring(1)
			      			return (<span key={tagKey}>{word}</span>)
			      		}

			      	})}
			      </span>
		      	)
		      
		    }
		},
		{
			title: "",
			key: "action",
			className: "text-right",
			render: (_text, record) => (
				<Popconfirm
					title="Are you sure delete this sentence ?"
					onConfirm={() => this.deleteSentence(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<a href="#" type="danger">
						Delete{" "}
					</a>
				</Popconfirm>
			),
		},
	];

	state = {
		sentences: [],
	};

	componentDidMount() {
		this.loadSentences();
	}

	loadSentences = () => {
		const url = "api/v1/sentences/index";
		fetch(url)
			.then((data) => {
				if (data.ok) {
					return data.json();
				}
				throw new Error("Network error.");
			})
			.then((data) => {
				data.forEach((sentence) => {
					let newEl = {
						key: sentence.id,
						id: sentence.id,
						content: sentence.content,
						entities: sentence.entities,
						contentTagged: this.formatContentTags(sentence)
					};


					this.setState((prevState) => ({
						sentences: [...prevState.sentences, newEl],
					}));
				});
			})
			.catch((err) => message.error("Error loading sentences: " + err));
	};

	reloadSentences = () => {
		this.setState({ sentences: [] });
		this.loadSentences();
	};

	deleteSentence = (id) => {
		const url = `api/v1/sentences/${id}`;

		fetch(url, {
			method: "delete",
		})
			.then((data) => {
				if (data.ok) {
					this.reloadSentences();
					return data.json();
				}
				throw new Error("Network error.");
			})
			.catch((err) => message.error("Error: " + err));
	};



	removeConsecutiveDup = (arr, len = 0, deletable = false) => {
	   if(len < arr.length){
	      if(deletable){
	         arr.splice(len, 1);
	         len--;
	      }
	      return this.removeConsecutiveDup(arr, len+1, arr[len] === arr[len+1])
	   };
	   return arr;
	};

	formatContentTags = (record) => {

		let tags = record.entities.map((entity, idx) => { let cidx = record.content.indexOf(entity.text); return {idxStart: cidx, pos: idx, id: entity.id, idxLast: cidx + entity.text.length } })
		tags = _.sortBy(tags, 'idxStart')

		let tagsContent = _.flatMapDeep(tags, function(to, tIdx, tags) { 
		  if (tags.length > 1) {
		    var prev = tIdx > 0 ? tags[tIdx -1] : false;
		    var next = tIdx + 1 > tags.length -1 ? false : tags[tIdx + 1]


		    var before = prev.idxLast + 1 == to.idx ? [] : [record.content.substring(prev.idxLast, to.idxStart)];
		    var curr = [record.entities[to.pos]]
		    var next = next.idxStart - 1 == to.idxLast ? [] : [record.content.substring(to.idxLast, next.idxStart)]
		    return [before, curr, next]


		  } else {
		    if (to.idx == 0) {
		      return [record.entities[to.pos], record.content.substring(to.idxLast)]
		    } else {
		      return [record.content.substring(0, to.idxStart - 1), record.entities[to.pos]]
		    }
		  }
		})


		return this.removeConsecutiveDup(_.compact(tagsContent))
	};


	render() {
		return (
			<>
				<Table
					className="table-striped-rows"
					dataSource={this.state.sentences}
					columns={this.columns}
					pagination={{ pageSize: 5 }}
				/>

				<AddSentenceModal reloadSentences={this.reloadSentences} />
			</>
		);
	}
}

export default Sentences;
